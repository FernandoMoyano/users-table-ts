import { Status } from "../enums";

export interface IUser {
  id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  status: Status;
  age: number;
}
