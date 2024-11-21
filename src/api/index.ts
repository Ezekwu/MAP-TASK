import User from '@/types/User';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  verifyPasswordResetCode,
} from 'firebase/auth';
import 'firebase/firestore';
import {
  WhereFilterOp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import AuthDetails from '@/types/AuthDetails';
import Admin from '@/types/Admin';
import Meal from '@/types/Meal';
import db, { auth, googleProvider } from './firebase';

class ApiService {
  async createUserWithEmailAndPassword(data: AuthDetails) {
    return createUserWithEmailAndPassword(auth, data.email, data.password).then(
      ({ user }) => user,
    );
  }

  signInWithGoogle() {
    return signInWithPopup(auth, googleProvider).then(({ user }) => user);
  }

  signInWithEmailAndPassword(data: AuthDetails) {
    return signInWithEmailAndPassword(auth, data.email, data.password).then(
      ({ user }) => user,
    );
  }

  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  verifyPasswordResetCode(code: string) {
    return verifyPasswordResetCode(auth, code);
  }

  resetPassword(actionCode: string, newPassword: string) {
    return confirmPasswordReset(auth, actionCode, newPassword);
  }

  createAdmin(data: Admin) {
    return this.set('admin', data.id, data);
  }

  setMeal(data: Meal) {
    return this.set('meal', data.id, data);
  }

  getUser(userId: string) {
    return Promise.resolve({ userId, name: 'Henry Eze' });
  }

  setUser(userData: User) {
    return this.set('users', userData.id, userData);
  }

  async doesDocumentExist(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  getMeals() {
    return this.getCollection<Meal>('meal');
  }

  private async getCollection<T>(collectionName: string): Promise<T[]> {
    const rawObjects = await getDocs(collection(db, collectionName));
    return rawObjects.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as unknown as T[];
  }

  private async query<T = unknown>({
    collectionName,
    key,
    condition,
    value,
  }: {
    collectionName: string;
    key: string;
    condition: WhereFilterOp;
    value: string;
  }): Promise<T[]> {
    const dbRef = collection(db, collectionName);
    const rawQuery = query(dbRef, where(key, condition, value));
    const snapShots = await getDocs(rawQuery);
    const documentList: T[] = [];
    snapShots.forEach((doc) => {
      documentList.push(doc.data() as T);
    });
    return documentList;
  }

  private async get<T>(collectionName: string, id: string): Promise<T> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      throw new Error('404: Document not found');
    }
  }

  private async set(collectionName: string, id: string, data: unknown) {
    return await setDoc(doc(db, collectionName, id), data);
  }
}

const Api = new ApiService();

export { Api };
