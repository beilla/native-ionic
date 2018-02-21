/* export interface IUser {
  id?: number;
  name: string;
  avatar: string;
  email: string;
  email2?: string;
  password?: string;
  lat?: number;
  lng?: number;
  me?: boolean;
} */

export interface IUser{
  id?:number,
  name:string,
  email:string,
  password:string,
  password2?:string,
  image:string,
  lat:number,
  lng:number,
  id_Facebook?:string,
  id_Google?:string
}

/* export interface ResponseUsers {
  users: IUser[];
  ok?: boolean;
  error?: string;
  id?: number;
  token?: string;
  errors?: string[];
}

export interface ResponseUser {
  user: IUser;
  ok?: boolean;
  error?: string;
  id?: number;
  token?: string;
  errors?: string[];
  profile?: IUser;
}
 */
