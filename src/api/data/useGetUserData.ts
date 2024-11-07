import Api from '..';

export function useGetUserData(userId: string) {
  return Api.getUser(userId);
}
