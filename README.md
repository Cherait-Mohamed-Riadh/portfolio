# Portfolio Website

A static portfolio website with contact form functionality.

## Features
- Static HTML/CSS/JS website
- Contact form with email notifications via Google Apps Script
- Responsive design
- Modern UI/UX

## Contact Form
The contact form uses Google Apps Script to send email notifications. The form data is sent to:
- Google Apps Script endpoint for email processing
- Email notifications are sent to the configured admin email
- Form validation and error handling included

## File Structure
- `index.html` - Main homepage
- `contact.html` - Contact page with form
- `blog.html` - Blog page
- `sites.html` - Projects showcase
- `analysis.html` - Analysis page
- `cybersecurity.html` - Cybersecurity page
- `css/` - Stylesheets
- `js/` - JavaScript files
- `image/` - Images and media files
- `google-apps-script-backend.js` - Google Apps Script code for contact form

## Setup
1. Deploy the Google Apps Script code to Google Apps Script
2. Update the Google Apps Script URL in `js/contact.js`
3. Configure the admin email in the Google Apps Script
4. Deploy the static files to any web hosting service

## Contact Form Configuration
The contact form is configured to send emails via Google Apps Script. To set it up:
1. Copy the code from `google-apps-script-backend.js`
2. Create a new Google Apps Script project
3. Paste the code and deploy as a web app
4. Update the script URL in `js/contact.js`
