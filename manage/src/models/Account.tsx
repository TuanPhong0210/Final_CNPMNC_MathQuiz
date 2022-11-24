import { Role } from './AccessControl';

export type AccountType = 'Administrator' | 'Teacher' | 'Student';

export interface Account {
  _id: string;
  account_code: string;
  name: string;
  roles: Role['name'][];
  type: AccountType;
}

export interface Administrator {}

export interface Teacher {}

export interface Student {}

export interface GeneralAccount
  extends Account,
    Partial<Administrator>,
    Partial<Teacher>,
    Partial<Student> {}
