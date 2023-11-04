import { useMutation, useQuery } from '@tanstack/react-query';
import api from '.';
import AuthDetails from '../types/AuthDetails';
import Schedule from '../types/Schedule';
import Task from '../types/Task';
import TaskGroup from '../types/TaskGroup';
import User from '../types/User';
import {
  CANDIDATES_QUERY_KEY,
  GET_SCHEDULE_QUERY_KEY,
  TASKS_QUERY_KEY,
  TASK_GROUPS_QUERY_KEY,
  USER_DETAILS_QUERY_KEY,
} from './queryKeys';

export function useRegisterQuery() {
  return mutationWrapper<AuthDetails>(api.createUserWithEmailAndPassword);
}

export function useRecordUserQuery() {
  return mutationWrapper<User>(api.recordAccountDetails.bind(api));
}

export function useLoginUserQuery() {
  return mutationWrapper<AuthDetails>(api.signInWithEmailAndPassword);
}

export function useCreateTaskGroupQuery() {
  return mutationWrapper<TaskGroup>(api.createTaskGroup.bind(api));
}
export function useCreateTaskQuery() {
  return mutationWrapper<Task>(api.createTask.bind(api));
}
export function useCreateScheduleQuery() {
  return mutationWrapper<Schedule>(api.createSchedule.bind(api));
}

export function useGetScheduleOfUserQuery(userId: string) {
  return useQuery([GET_SCHEDULE_QUERY_KEY, userId], () =>
    api.getScheduleOfUser(userId),
  );
}
export function useGetTaskGroupOfUserQuery(userId: string) {
  return useQuery([TASK_GROUPS_QUERY_KEY, userId], () =>
    api.getTaskGroupsOfUser(userId),
  );
}
export function useGetTasksOfUserQuery(userId: string) {
  return useQuery([TASKS_QUERY_KEY, userId], () => api.getTasksOfUser(userId));
}
export function useGetCandidatesQuery() {
  return useQuery([CANDIDATES_QUERY_KEY], () => api.getCandidates());
}

export function useGetUserProfile(userId: string) {
  return useQuery([USER_DETAILS_QUERY_KEY, userId], () => api.getUser(userId));
}

function mutationWrapper<
  T = Record<string, string>,
  R = Record<string, string>,
>(requestFn: (param: T) => Promise<unknown>) {
  const mutation = useMutation((data: T) => requestFn(data));

  const requestRun = (data: T) => {
    try {
      return mutation.mutateAsync(data) as Promise<R>;
    } catch (e) {
      console.error('Mutation failed:', e);
      throw new Error('Mutation failed');
    }
  };

  return {
    request: requestRun,
    isLoading: mutation.isLoading,
    isError: !!mutation.error,
    status: mutation.status,
    error: mutation.error,
  };
}
