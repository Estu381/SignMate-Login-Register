const admin = require('firebase-admin');
const serviceAccount = require('./REPLACED_SERVICE_ACCOUNT_KEY');
const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ''
});

const db = getFirestore();

module.exports = { admin, db };
