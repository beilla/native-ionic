import { IUser } from './i-user';

export interface IEvent {
  id?: number,
  title: string,
  date: string | Date,
  description: string,
  image: string,
  price: number,
  address: string,
  lat: number,
  lng: number,
  creator?: number,
  mine?: boolean,
  attend?: boolean,
  distance?: number,
  creatorData?: IUser
}

/*
export interface IEvent {
  id?: number;
  creator?: IUser;
  title: string;
  image: string;
  date: string;
  description: string;
  price: number;
  lat?: number;
  lng?: number;
  mine?: boolean;
  address?: string;
  attend?: boolean;
  distance?: number;
}

export interface ResponseEvents {
  events: IEvent[];
  ok?: boolean;
  error?: string;
  id?: number;
  token?: string;
  errors?: string[];
}

export interface ResponseEvent {
  event: IEvent;
  ok?: boolean;
  error?: string;
  id?: number;
  token?: string;
  errors?: string[];
} */
