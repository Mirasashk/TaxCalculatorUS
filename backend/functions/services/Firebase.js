var admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

var serviceAccount = require('../taxcalculatorus-firebase-adminsdk-j196h-c978bb9fcb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// As an admin, the app has access to read and write all data, regardless of Security Rules

const db = getFirestore();

module.exports = { db };
