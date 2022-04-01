import { IBase } from './base';

export interface IUser extends IBase {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastname: string;
  phoneNumber: number;
  city: string;
}