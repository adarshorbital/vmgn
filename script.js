document.addEventListener('DOMContentLoaded', function () {

  // ── NAVBAR: transparent → solid on scroll ──
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  // ── HAMBURGER ──
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      var targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(targetId);
        if (target) {
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
      }
    });
  });

  // ── SCROLL REVEAL ──
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = entry.target.dataset.delay || '0';
        entry.target.style.transitionDelay = parseFloat(delay) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.cap-card, .retail-card, .about-text-col, .about-image-col, .hq-info, .hq-map, .contact-form').forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ── STATS COUNTER ──
  function countUp(el, target, duration) {
    var start = performance.now();
    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  var numbersSection = document.querySelector('.numbers');
  if (numbersSection) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-number').forEach(function (num) {
            countUp(num, parseInt(num.getAttribute('data-target'), 10), 1800);
          });
          this.unobserve(entry.target);
        }
      });
    }, { threshold: 0.30 }).observe(numbersSection);
  }

  // ─────────────────────────────────────────────────────────────────
  //  GOOGLE FORM INTEGRATION
  //
  //  HOW TO SET UP (one-time, ~10 minutes):
  //
  //  1. Go to forms.google.com → create a new blank form
  //
  //  2. Add these six fields in order (field type in brackets):
  //       Full Name          [Short answer]
  //       Company Name       [Short answer]
  //       Email Address      [Short answer]
  //       Phone Number       [Short answer]
  //       Nature of Inquiry  [Dropdown] — add: Wholesale Inquiry / Bulk Order / Partnership / Other
  //       Message            [Paragraph]
  //
  //  3. Get email notifications:
  //       Responses tab → ⋮ (three dots) → "Get email notifications for new responses"
  //       Add: namaste@vmgnfashions.com
  //
  //  4. Get your FORM_ACTION URL:
  //       Click "Send" → Link icon → copy the link
  //       It looks like: https://docs.google.com/forms/d/e/ABC123.../viewform
  //       Replace "/viewform" with "/formResponse" → that is your FORM_ACTION below
  //
  //  5. Get field entry IDs:
  //       Open the form preview link → right-click on each input → Inspect
  //       Each field has a name like "entry.1234567890" — copy that number for each field
  //       OR: click ⋮ → "Get pre-filled link" → fill in dummy text → Submit
  //       The URL will show ?entry.XXXX=dummy&entry.YYYY=dummy etc.
  //
  //  6. Paste values below — save — done.
  // ─────────────────────────────────────────────────────────────────

  var GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSdDjApPWJ5j3Ze4M7A3Pl-vOZ_SQ_5EDnSfCCFh-82Xnuo9yA/formResponse';

  var ENTRY = {
    name:    'entry.366343801',
    company: 'entry.1114141589',
    email:   'entry.2034944749',
    phone:   'entry.191492947',
    inquiry: 'entry.2145111458',
    message: 'entry.1617363012'
  };

  // ── FORM SUBMIT ──
  var form       = document.getElementById('contactForm');
  var successBox = document.getElementById('formSuccess');
  var submitBtn  = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var vals = {
        name:    document.getElementById('name').value.trim(),
        company: document.getElementById('company').value.trim(),
        email:   document.getElementById('email').value.trim(),
        phone:   document.getElementById('phone').value.trim(),
        inquiry: document.getElementById('inquiry').value,
        message: document.getElementById('message').value.trim()
      };

      var allFilled = Object.values(vals).every(function (v) { return v !== ''; });
      if (!allFilled) {
        alert('Please fill in all required fields.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Sending…';

      var body = new FormData();
      body.append(ENTRY.name,    vals.name);
      body.append(ENTRY.company, vals.company);
      body.append(ENTRY.email,   vals.email);
      body.append(ENTRY.phone,   vals.phone);
      body.append(ENTRY.inquiry, vals.inquiry);
      body.append(ENTRY.message, vals.message);

      // no-cors: Google accepts the POST; we can't read the response (CORS policy)
      // but the data lands in the Sheet. Treat network error as the only real failure.
      fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body: body })
        .then(function () {
          form.style.display = 'none';
          if (successBox) {
            successBox.style.display = 'flex';
            successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Send Enquiry';
          alert('Network error. Please try WhatsApp or email us directly at namaste@vmgnfashions.com');
        });
    });
  }

});
