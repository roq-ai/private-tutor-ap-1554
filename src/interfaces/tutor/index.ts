import { BookingInterface } from 'interfaces/booking';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TutorInterface {
  id?: string;
  skills: string;
  location: string;
  availability: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  user?: UserInterface;
  _count?: {
    booking?: number;
  };
}

export interface TutorGetQueryInterface extends GetQueryInterface {
  id?: string;
  skills?: string;
  location?: string;
  availability?: string;
  user_id?: string;
}
