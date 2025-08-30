import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, auth } from './firebase';

export const uploadFile = async (file: File, path: string): Promise<string> => {
  if (!auth.currentUser) throw new Error('User not authenticated');
  
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const uploadProfilePicture = async (file: File, uid: string): Promise<string> => {
  const path = `profile-pictures/${uid}/${file.name}`;
  return uploadFile(file, path);
};

export const uploadDocument = async (file: File, uid: string): Promise<string> => {
  const path = `documents/${uid}/${file.name}`;
  return uploadFile(file, path);
};

export const uploadMultipleDocuments = async (files: File[], uid: string): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadDocument(file, uid));
  return Promise.all(uploadPromises);
};

export const deleteFile = async (url: string) => {
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
};