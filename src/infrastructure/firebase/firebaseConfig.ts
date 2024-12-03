import admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();


const serviceAccount = require('../../../firebaseCredentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export { db };