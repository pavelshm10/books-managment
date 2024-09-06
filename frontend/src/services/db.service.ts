import { firestore } from "../firebase";

export const fetchData = async (
  collection: string,
  rejectWithValue: any
): Promise<any[]> => {
  try {
    const snapshot = await firestore.collection(collection).get();
    if (snapshot.empty) {
      //collection is empty or not exits
      return [];
    }
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    return rejectWithValue("Failed to fetch books");
  }
};

export const addDocument = async <T extends object>(
  documentName: string,
  documentBody: T,
  rejectWithValue: any
): Promise<any> => {
  try {
    const docRef = await firestore.collection(documentName).add(documentBody);
    console.log(`${documentName} written with ID: ${docRef.id}`);
    return { ...documentBody, id: docRef.id };
  } catch (error) {
    return rejectWithValue("Failed to add author to Firebase");
  }
};
