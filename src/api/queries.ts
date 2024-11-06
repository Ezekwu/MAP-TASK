import { useQuery } from '@tanstack/react-query';
import {
  USER_DETAILS_QUERY_KEY
} from './queryKeys';

export function useGetUserProfile(userId: string) {
  return useQuery([USER_DETAILS_QUERY_KEY, userId], () => Promise.resolve({ name: "Henry Eze", email: "henryeze019@gmail.com", id: "123", role: "hr" }));
}
