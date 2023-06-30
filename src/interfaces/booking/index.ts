import { UserInterface } from 'interfaces/user';
import { TutorInterface } from 'interfaces/tutor';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  date_time: any;
  user_id?: string;
  tutor_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  tutor?: TutorInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  tutor_id?: string;
}
