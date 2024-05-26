export interface IUser {
  id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  status: Status;
  age: number;
}

export enum Status {
  Active = "active",
  Inactive = "inactive",
}

export enum ActionType {
  Edit = "edit",
  Delete = "delete",
}

export enum ResponseType {
  Confirm = "confirm",
  Cancel = "cancel",
}
