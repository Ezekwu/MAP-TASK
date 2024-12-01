export function userIsLoggedIn() {
  return !!localStorage.getItem('uid');
}

// TODO: Jerry handle auth guard
export function authGuard(url: string) {
  if (url === 'personal details') return true;

  return userIsLoggedIn();
}
