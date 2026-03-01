/*
  VMGN Fashions Private Limited - JavaScript
  
  VANILLA JAVASCRIPT:
  "Vanilla" means pure JavaScript without any libraries or frameworks like jQuery.
  All functionality is written using native browser JavaScript APIs.
  
  TECHNOLOGIES & CONCEPTS USED:
  
  1. DOM MANIPULATION:
     - Document Object Model (DOM) is the browser's representation of HTML as a tree structure
     - getElementById() and querySelector() find elements in the DOM
     - classList.toggle() adds/removes CSS classes to change appearance
     - addEventListener() listens for user interactions (clicks, scrolls, etc.)
  
  2. EVENT LISTENERS:
     - Functions that wait for specific events to happen (click, scroll, load, etc.)
     - When event occurs, a callback function executes
  
  3. MOBILE MENU TOGGLE:
     - Hamburger icon toggles mobile navigation menu visibility
     - Adds/removes 'active' class which triggers CSS transitions
  
  4. SMOOTH SCROLL:
     - When clicking nav links, page smoothly scrolls to target section
     - Uses scrollIntoView() browser API
  
  5. NAVBAR SCROLL EFFECT:
     - Changes navbar appearance when user scrolls down
     - Adds shadow for better visibility
*/

// ========================================
// MOBILE MENU TOGGLE
// ========================================

/*
  Wait for the DOM to fully load before running JavaScript
  This ensures all HTML elements exist before we try to access them
*/
document.addEventListener('DOMContentLoaded', function() {
  
  /*
    GET DOM ELEMENTS:
    getElementById() finds HTML elements by their id attribute
    We store them in variables so we can use them later
  */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');
  
  /*
    HAMBURGER CLICK EVENT:
    When hamburger icon is clicked, toggle the 'active' class
    This shows/hides the mobile menu (CSS handles the animation)
  */
  hamburger.addEventListener('click', function() {
    // Toggle 'active' class on hamburger (animates the icon)
    hamburger.classList.toggle('active');
    
    // Toggle 'active' class on nav links (slides menu in/out)
    navLinks.classList.toggle('active');
  });
  
  /*
    CLOSE MOBILE MENU WHEN CLICKING A LINK:
    querySelectorAll() finds all elements matching a CSS selector
    We loop through each nav link and add a click listener
    When a link is clicked, we close the mobile menu
  */
  const navLinkElements = document.querySelectorAll('.nav-link');
  navLinkElements.forEach(function(link) {
    link.addEventListener('click', function() {
      // Remove 'active' class to close the menu
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  
  /*
    SCROLL EVENT LISTENER:
    Listens for page scroll and adds shadow to navbar
    window.scrollY returns how far user has scrolled from top
  */
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      // User has scrolled more than 100px - add shadow
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      // User is near top - use default shadow
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });
  
  // ========================================
  // SMOOTH SCROLL FOR NAVIGATION LINKS
  // ========================================
  
  /*
    SMOOTH SCROLL POLYFILL:
    Although we use CSS scroll-behavior: smooth in the stylesheet,
    this JavaScript provides additional smooth scrolling with more control
    
    How it works:
    1. Prevent default link behavior (jumping to section)
    2. Get the target section's position
    3. Smoothly scroll to that position
  */
  navLinkElements.forEach(function(link) {
    link.addEventListener('click', function(e) {
      // Get the href attribute (e.g., "#about")
      const targetId = this.getAttribute('href');
      
      // Check if it's an internal link (starts with #)
      if (targetId.startsWith('#')) {
        e.preventDefault(); // Stop default jump behavior
        
        // Find the target section
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          /*
            scrollIntoView() is a browser API that scrolls element into view
            behavior: 'smooth' makes it animate instead of jumping
            block: 'start' aligns section to top of viewport
          */
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ========================================
  // FORM VALIDATION (Optional Enhancement)
  // ========================================
  
  /*
    FORM SUBMIT EVENT:
    Basic client-side validation before submitting to Formspree
    This runs before the form is sent to the server
  */
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Get form field values
      const name = document.getElementById('name').value.trim();
      const company = document.getElementById('company').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const inquiry = document.getElementById('inquiry').value;
      const message = document.getElementById('message').value.trim();
      
      // Check if any required field is empty
      if (!name || !company || !email || !phone || !inquiry || !message) {
        e.preventDefault(); // Stop form submission
        alert('Please fill in all required fields.');
        return false;
      }
      
      // Basic email validation using Regular Expression (regex)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        return false;
      }
      
      /*
        If validation passes, form submits normally to Formspree
        Formspree will handle sending the email to specified addresses
      */
    });
  }
  
  // ========================================
  // ANIMATION ON SCROLL (Optional Enhancement)
  // ========================================
  
  /*
    INTERSECTION OBSERVER API:
    Modern browser API that detects when elements enter the viewport
    We can use this to trigger animations when user scrolls to sections
    
    This is optional but adds a nice polish to the site
  */
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Element is now visible - add 'visible' class
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all scale cards and retail cards for scroll animations
  const animatedElements = document.querySelectorAll('.scale-card, .retail-card');
  animatedElements.forEach(function(el) {
    observer.observe(el);
  });
  
  /*
    CONSOLE LOG FOR DEBUGGING:
    Helpful message in browser console confirming JavaScript loaded
    Open browser DevTools (F12) to see this message
  */
  console.log('VMGN Fashions website JavaScript loaded successfully!');
  console.log('Technologies used: Vanilla JavaScript, DOM Manipulation, Event Listeners, Intersection Observer API');
  
});

/*
  END OF JAVASCRIPT FILE
  
  SUMMARY OF WHAT THIS FILE DOES:
  1. Mobile hamburger menu toggle functionality
  2. Closes mobile menu when navigation link is clicked
  3. Adds shadow to navbar when scrolling
  4. Smooth scrolling to sections when clicking nav links
  5. Form validation before submission to Formspree
  6. Scroll animations using Intersection Observer API
  
  All of this is done with pure JavaScript - no jQuery, no React, no frameworks.
  This makes the site fast, lightweight, and easy to maintain.
*/