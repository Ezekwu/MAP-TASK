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
import db, { Collections, auth, googleProvider } from './firebase';
import { WeeklyMealSchedule } from '@/types/WeeklyMealSchedule';
import ScheduleAssignment from '@/types/ScheduleAssignment';
import dayjs from 'dayjs';

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
    return this.set(Collections.ADMIN, data.id, data);
  }

  setMeal(data: Meal) {
    return this.set(Collections.MEAL, data.id, data);
  }

  getUser(userId: string) {
    return Promise.resolve({ userId, name: 'Henry Eze' });
  }

  setUser(userData: User) {
    return this.set(Collections.USERS, userData.id, userData);
  }

  setSchedule(schedule: WeeklyMealSchedule) {
    return this.set(Collections.SCHEDULE, schedule.id, schedule);
  }

  assignSchedule(assignment: ScheduleAssignment) {
    return this.set(Collections.WEEKLY_SCHEDULES, assignment.id, assignment);
  }

  getMeals() {
    return this.getCollection<Meal>(Collections.MEAL);
  }

  getUsers() {
    return this.getCollection<User>(Collections.USERS);
  }

  getSchedules() {
    return this.getCollection<WeeklyMealSchedule>(Collections.SCHEDULE);
  }

  async getThisAndNextWeekSchedules() {
    const startOfThisWeek = dayjs().startOf('week').toDate().getTime();
    const endOfThisWeek = dayjs().endOf('week').toDate().getTime();
    const startOfNextWeek = dayjs()
      .add(1, 'week')
      .startOf('week')
      .toDate()
      .getTime();

    const endOfNextWeek = dayjs()
      .add(1, 'week')
      .endOf('week')
      .toDate()
      .getTime();

    try {
      // Query for this week's schedules
      const thisWeekSchedules = await this.query<ScheduleAssignment>({
        collectionName: Collections.WEEKLY_SCHEDULES,
        conditions: [
          { key: 'startDate', condition: '>=', value: startOfThisWeek },
          { key: 'endDate', condition: '<=', value: endOfThisWeek },
        ],
      });

      // Query for next week's schedules
      const nextWeekSchedules = await this.query<ScheduleAssignment>({
        collectionName: Collections.WEEKLY_SCHEDULES,
        conditions: [
          { key: 'startDate', condition: '>=', value: startOfNextWeek },
          { key: 'endDate', condition: '<=', value: endOfNextWeek },
        ],
      });

      return {
        thisWeekSchedules,
        nextWeekSchedules,
      };
    } catch (error) {
      console.error('Error fetching schedules:', error);
      throw new Error('Could not fetch weekly schedules.');
    }
  }

  private async getCollection<T>(collectionName: Collections): Promise<T[]> {
    const rawObjects = await getDocs(collection(db, collectionName));
    return rawObjects.docs.map((doc) => ({
      ...doc.data(),
    })) as unknown as T[];
  }

  async doesDocumentExist(collectionName: Collections, id: string) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  private async query<T = unknown>({
    collectionName,
    conditions,
  }: {
    collectionName: Collections;
    conditions: { key: string; condition: WhereFilterOp; value: any }[];
  }): Promise<T[]> {
    const dbRef = collection(db, collectionName);

    // Dynamically add query conditions
    const rawQuery = query(
      dbRef,
      ...conditions.map(({ key, condition, value }) =>
        where(key, condition, value),
      ),
    );

    const snapShots = await getDocs(rawQuery);
    const documentList: T[] = [];
    snapShots.forEach((doc) => {
      documentList.push(doc.data() as T);
    });
    return documentList;
  }

  private async get<T>(collectionName: Collections, id: string): Promise<T> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      throw new Error('404: Document not found');
    }
  }

  private async set(collectionName: Collections, id: string, data: unknown) {
    return await setDoc(doc(db, collectionName, id), data);
  }
}

const Api = new ApiService();

export { Api };
