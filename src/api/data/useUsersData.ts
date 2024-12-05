import { Api } from '..';

export function useUsersData() {
  return Api.getUsers();
}
