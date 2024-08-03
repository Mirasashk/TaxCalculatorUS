/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const express = require('express');
const cors = require('cors');
const calculations = require('./routes/calculations');
const { db } = require('./services/Firebase');
const { stateTaxes } = require('./utils/stateTaxes');

const app = express();
const corsOptions = {
  origin: ['https://taxcalculatorus.web.app', 'http://localhost:5173'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use('/calculations', calculations);

// const importJSON = async () => {
//   db.collection('statesTaxInfo')
//     .doc('2024')
//     .collection('stateTaxes')
//     .doc('washington, dc')
//     .set({});
// };

//importJSON();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.app = onRequest(app);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
