export interface IUser {
  id: string
  name: string
  email: string
  password: string
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor (props: IUser) {
    Object.assign(this, props);
  }
}
