export default interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_numner: string;
  home_adress: string;
  profile_img: string | File | null;
  local_government: '';
  goals: string | null;
  allergies: string | null;
}
