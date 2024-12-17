class TokenHandler {
  setToken(token: string) {
    localStorage.setItem('uid', token);
  }

  getToken() {
    return localStorage.getItem('uid') || undefined;
  }

  removeToken() {
    localStorage.removeItem('uid');
  }
}

export default new TokenHandler();
