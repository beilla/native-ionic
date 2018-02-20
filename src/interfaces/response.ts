/* import { IUser } from './i-user'; */

/* export interface ResponseOk {
  ok: boolean;
  error?: string;
  id?: number;
  token?: string;
  errors?: string[];
  users?: IUser[];
} */

export interface IResponse {
  error: boolean,
  errorMessage: string,
  token: string,
  result: any
}
