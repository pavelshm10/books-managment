import { firestore } from "../firebase";

export const fetchData = async <T>(
  collection: string,
  rejectWithValue: (value: string) => any
): Promise<T[] | ReturnType<typeof rejectWithValue>> => {
  try {
    const snapshot = await firestore.collection(collection).get();
    if (snapshot.empty) {
      //collection is empty or not exits
      return [];
    }
    const data: T[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as T)
    );

    return data;
  } catch (error) {
    return rejectWithValue("An unknown error occurred.");
  }
};

export const addDocument = async <T extends object>(
  documentName: string,
  documentBody: T,
  rejectWithValue: any
): Promise<T | ReturnType<typeof rejectWithValue>> => {
  try {
    const docRef = await firestore.collection(documentName).add(documentBody);
    console.log(`${documentName} written with ID: ${docRef.id}`);
    return { ...documentBody, id: docRef.id } as T;
  } catch (error) {
    return rejectWithValue("Failed to add author to Firebase");
  }
};

export const updateDocument = async (
  collection: string,
  docId: string,
  field: string,
  value: any,
  rejectWithValue: any
) => {
  try {
    // Get the document reference by title (or use ID if available)
    const docRef = firestore.collection(collection).doc(docId);
    await docRef.update({
      [field]: value,
    });
    console.log(`${field} updated successfully!`);
    return { docId, fieldName: field, value };
  } catch (error) {
    return rejectWithValue("Failed to update document"); // Return error message for failure
  }
};
