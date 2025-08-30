import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  role: 'admin' | 'stylist';
  status?: 'pending' | 'approved' | 'rejected';
  profilePicture?: string;
  skills?: string;
  experience?: string;
  location?: string;
  documents?: string[];
  createdAt: string;
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/user-not-found' && email === 'admin@stylelink.com') {
      const adminUser = await createUserWithEmailAndPassword(auth, email, password);
      const adminProfile: UserProfile = {
        uid: adminUser.user.uid,
        email: adminUser.user.email!,
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', adminUser.user.uid), adminProfile);
      return adminUser.user;
    }
    throw error;
  }
};

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const registerWithEmail = async (email: string, password: string, userData: Partial<UserProfile>) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  
  const userProfile: UserProfile = {
    uid: result.user.uid,
    email: result.user.email!,
    name: userData.name || '',
    phone: userData.phone || '',
    role: userData.role || 'stylist',
    status: userData.role === 'stylist' ? 'pending' : undefined,
    skills: userData.skills || '',
    experience: userData.experience || '',
    location: userData.location || '',
    createdAt: new Date().toISOString()
  };

  await setDoc(doc(db, 'users', result.user.uid), userProfile);
  return { user: result.user, profile: userProfile };
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as UserProfile : null;
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  const docRef = doc(db, 'users', uid);
  await setDoc(docRef, updates, { merge: true });
};

export const logout = () => signOut(auth);