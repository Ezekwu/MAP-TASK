import Plans from './enums/Plans';
import UserStatus from './enums/UserStatus';

export default interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_img: string | File | null;
  goals: string | null;
  allergies: string | null;
  status?: UserStatus;
  plan?: {
    plan: Plans;
    startDate: number;
    endDate: number;
  };
  createdAt: number;
  location: {
    home_address: string;
    local_government: '';
  };
}
