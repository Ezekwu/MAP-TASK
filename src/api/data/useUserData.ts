import { Api } from '..';

export function useUserData(userId: string) {
  return Api.getUser(userId);
}
