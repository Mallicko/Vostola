/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin     = require("firebase-admin");
const sgMail    = require("@sendgrid/mail");

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);

exports.welcomeEmail = functions.firestore
  .document("subscribers/{email}")
  .onCreate(async (snap) => {
    const { email } = snap.data();

    const msg = {
      to: email,
      from: "newsletter@vostola.com",
      subject: "Welcome to Vostola ✨",
      text: "Thanks for subscribing! We’ll keep you posted.",
      html: "<p>Thanks for subscribing to Vostola. </p>"
    };

    await sgMail.send(msg);
  });
exports.unsubscribeEmail = functions.firestore
  .document("subscribers/{email}")
  .onDelete(async (snap, context) => {
    const { email } = (snap.data() && snap.data().email) || context.params.email;

    // Send an email to the user
    // 2) Build the message (plain or dynamic template)
    const msg = {
        to:   email,
        from: "newsletter@vostola.com",
        subject: "You've been unsubscribed",
        text:    "Sad to see you go. You’ll receive no further e‑mails.",
        html:    "<p>Sad to see you go. You’ll receive no further e‑mails.</p>"
        };
    
        // 3) Fire it off
        try {
        await sgMail.send(msg);
        console.log(`Unsubscribe e‑mail sent to ${email}`);
        } catch (err) {
        console.error(`SendGrid err for ${email}`, err);
        }
    });
