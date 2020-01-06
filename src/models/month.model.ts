import {UserModel} from './user.model';

interface MonthModel {
  name: string;
  users: UserModel[];
}

export {MonthModel};
