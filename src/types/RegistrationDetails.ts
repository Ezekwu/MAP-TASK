export default interface RegistrationDetails {
  email: string;
  first_name: string;
  last_name: string;
  phone_numner: string;
  home_address: string;
  profile_img: File | null | string;
}
