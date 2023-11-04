export default interface User {
  email: string;
  name: string;
  role: 'hr' | 'applicant'
  _id: string;
}
