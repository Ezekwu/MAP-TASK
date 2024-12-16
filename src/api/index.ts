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
  deleteDoc,
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

interface QuerySchema {
  key: string;
  condition: WhereFilterOp;
  value: string | number;
}
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
    return this.get<User>(Collections.USERS, userId);
  }

  setUser(userData: User) {
    return this.set(Collections.USERS, userData.id, userData);
  }

  setSchedule(schedule: WeeklyMealSchedule) {
    return this.set(Collections.SCHEDULE, schedule.id, schedule);
  }

  async assignSchedule(assignment: ScheduleAssignment) {
    await this.set(Collections.WEEKLY_SCHEDULES, assignment.id, assignment);

    return assignment;
  }

  getMeals() {
    return this.getCollection<Meal>(Collections.MEAL);
  }

  getUsers() {
    return this.getCollection<User>(Collections.USERS);
  }

  getSchedule(scheduleId: string) {
    return this.get<WeeklyMealSchedule>(Collections.SCHEDULE, scheduleId);
  }

  getSchedules() {
    return this.getCollection<WeeklyMealSchedule>(Collections.SCHEDULE);
  }

  getAvailableMeals() {
    return this.query<Meal>({
      collectionName: Collections.MEAL,
      conditions: [{ key: 'soldOut', condition: '==', value: false }],
    });
  }

  async getThisAndNextWeekSchedules(userId?: string) {
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
      const thisWeekConditions: QuerySchema[] = [
        { key: 'startDate', condition: '>=', value: startOfThisWeek },
        { key: 'endDate', condition: '<=', value: endOfThisWeek },
      ];

      if (userId) {
        thisWeekConditions.push({
          key: 'userId',
          condition: '==',
          value: userId,
        });
      }

      const thisWeekSchedules = await this.query<ScheduleAssignment>({
        collectionName: Collections.WEEKLY_SCHEDULES,
        conditions: thisWeekConditions,
      });

      const nextWeekConditions: QuerySchema[] = [
        { key: 'startDate', condition: '>=', value: startOfNextWeek },
        { key: 'endDate', condition: '<=', value: endOfNextWeek },
      ];

      if (userId) {
        nextWeekConditions.push({
          key: 'userId',
          condition: '==',
          value: userId,
        });
      }

      const nextWeekSchedules = await this.query<ScheduleAssignment>({
        collectionName: Collections.WEEKLY_SCHEDULES,
        conditions: nextWeekConditions,
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

  async deleteSchedule(scheduleId: string) {
    return this.deleteItem(Collections.SCHEDULE, scheduleId);
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

  private async deleteItem(
    collectionName: Collections,
    itemId: string,
  ): Promise<void> {
    try {
      const documentRef = doc(db, collectionName, itemId);
      await deleteDoc(documentRef);
      return;
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
      throw error;
    }
  }
}

const Api = new ApiService();

export { Api };
