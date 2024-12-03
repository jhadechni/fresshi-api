import admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const base64Credentials = process.env.FIREBASE_CREDENTIALS_BASE64;
if (!base64Credentials) {
  throw new Error('FIREBASE_CREDENTIALS_BASE64 no está definida');
}

const serviceAccount = JSON.parse(Buffer.from(base64Credentials, 'base64').toString('utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export { db };
