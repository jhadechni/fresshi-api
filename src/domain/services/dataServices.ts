import { db } from '../../infrastructure/firebase/firebaseConfig';

export const getDataService = async () => {
  try {
    const dataCollection = await db.collection('store_types').get();
    return dataCollection.docs.map(doc => ({ ...doc.data() }));
  } catch (error) {
    throw new Error('Error fetching data from Firebase');
  }
};
