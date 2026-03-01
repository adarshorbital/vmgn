# Formspree Setup Guide for VMGN Contact Form

## What is Formspree?

Formspree is a free service that handles form submissions without requiring backend code or a server. When someone fills out your contact form, Formspree receives the data and emails it to your specified addresses.

## Why Formspree?

✅ **No backend code needed** - Works with static HTML sites
✅ **Free tier available** - 50 submissions per month (perfect for corporate sites)
✅ **Email notifications** - Sends form data directly to your email
✅ **Spam protection** - Built-in reCAPTCHA and spam filtering
✅ **Easy setup** - Just 3 steps!

## Step-by-Step Setup

### Step 1: Create Formspree Account

1. Go to **[https://formspree.io/](https://formspree.io/)**
2. Click "Get Started" or "Sign Up"
3. Create account with your email (use: `namaste@vmgnfashions.com`)
4. Verify your email address

### Step 2: Create New Form Project

1. In Formspree dashboard, click **"+ New Form"**
2. Give it a name: **"VMGN Contact Inquiries"**
3. Formspree will generate a unique Form ID
4. Your Form ID looks like: `xpzbkjlo` (example)
5. **Copy this Form ID** - you'll need it next!

### Step 3: Update Your Website Code

1. Open your `index.html` file
2. Find this line (around line 314):
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID
4. Example:
   ```html
   <form action="https://formspree.io/f/xpzbkjlo" method="POST" class="contact-form">
   ```
5. **Save the file**
6. **Commit and push to GitHub** (or re-deploy your site)

### Step 4: Configure Email Recipients

1. In Formspree dashboard, click on your form
2. Go to **"Settings"** tab
3. Scroll to **"Email Notifications"**
4. Add recipient email addresses:
   - `admin@golghar.org`
   - `namaste@vmgnfashions.com`
5. Click **"Save"**

### Step 5: Test the Form

1. Visit your live website
2. Scroll to the Contact section
3. Fill out the form with test data:
   - Name: Test User
   - Company: Test Company
   - Email: your-test-email@gmail.com
   - Phone: +91-1234567890
   - Nature of Inquiry: Wholesale Inquiry
   - Message: This is a test submission
4. Click **"Send Inquiry"**
5. You'll be redirected to a Formspree confirmation page
6. Check your email (both `admin@golghar.org` and `namaste@vmgnfashions.com`)
7. You should receive the form submission as an email!

## Formspree Dashboard Features

### View Submissions
- All form submissions appear in your Formspree dashboard
- You can see submission date, time, and all field values
- Export submissions as CSV for record-keeping

### Spam Protection
- Formspree includes built-in spam filtering
- You can enable reCAPTCHA for additional protection
- Settings → "Spam Protection" → Enable reCAPTCHA

### Custom Confirmation Page
- By default, users see Formspree's confirmation page
- You can redirect to a custom "Thank You" page
- Settings → "Redirect" → Enter your thank you page URL

### Email Templates
- Customize the email notification format
- Settings → "Email Templates"
- Add your company branding to notification emails

## Pricing Information

### Free Tier (Perfect for VMGN)
- ✅ 50 submissions per month
- ✅ Unlimited forms
- ✅ Email notifications
- ✅ Spam filtering
- ✅ File uploads
- ✅ AJAX support

For a corporate website receiving a few inquiries per week, the free tier is more than sufficient!

### Paid Tiers (If Needed Later)
- **Gold ($10/month)**: 1,000 submissions/month + custom branding
- **Platinum ($40/month)**: 10,000 submissions/month + priority support

## Troubleshooting

### Form not working?

**Issue**: Form submission doesn't send email
**Solutions**:
1. Double-check Form ID in `index.html` matches your Formspree dashboard
2. Ensure you've verified your email address in Formspree
3. Check spam/junk folder for notification emails
4. Make sure you've deployed the updated code to your live site

**Issue**: Getting spam submissions
**Solutions**:
1. Enable reCAPTCHA in Formspree settings
2. Add honeypot field (Formspree has this built-in)
3. Review spam filter settings in dashboard

**Issue**: Not receiving emails
**Solutions**:
1. Check email addresses are correctly added in Settings
2. Verify emails aren't going to spam folder
3. Test with a different email address
4. Contact Formspree support (they're very responsive!)

## Alternative: Custom Thank You Page

If you want to keep users on your site after submission:

1. Create a `thank-you.html` file in your project:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Thank You - VMGN Fashions</title>
     <link rel="stylesheet" href="style.css">
   </head>
   <body>
     <section class="thank-you" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px;">
       <div>
         <h1 style="font-size: 48px; color: #4d1414; margin-bottom: 20px;">Thank You!</h1>
         <p style="font-size: 20px; margin-bottom: 30px;">We've received your inquiry and will respond within 24 hours.</p>
         <a href="index.html" style="display: inline-block; padding: 16px 40px; background: #4d1414; color: white; text-decoration: none; border-radius: 4px;">Return to Home</a>
       </div>
     </section>
   </body>
   </html>
   ```

2. In Formspree dashboard:
   - Settings → "Redirect"
   - Enter: `https://your-domain.com/thank-you.html`
   - Save

3. Users will see your custom page instead of Formspree's

## Security Best Practices

✅ **Never expose API keys** (Formspree doesn't use API keys for basic forms)
✅ **Enable spam protection** in Formspree settings
✅ **Monitor submissions** regularly in dashboard
✅ **Use HTTPS** when deploying (GitHub Pages and Cloudflare provide this free)
✅ **Validate input** on client-side (already included in `script.js`)

## Summary

**Your Form ID is the ONLY thing you need to change!**

1. Get Form ID from Formspree dashboard
2. Replace `YOUR_FORM_ID` in `index.html`
3. Configure email recipients in Formspree settings
4. Deploy and test!

That's it! Your contact form will be fully functional. 🎉

## Support Resources

- **Formspree Documentation**: [https://help.formspree.io/](https://help.formspree.io/)
- **Formspree Support**: support@formspree.io
- **Status Page**: [https://status.formspree.io/](https://status.formspree.io/)

Formspree is used by thousands of websites worldwide and is very reliable!
