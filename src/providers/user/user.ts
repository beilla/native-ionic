import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../../interfaces/i-user';
import { Constants } from '../../constants';
import { IResponse } from '../../interfaces/response';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getMe(): Observable<IUser> {
    return this.http.get(Constants.SERVER + "users/me")
      .catch(error => Observable.throw("Error trying to get user. Detail: " + error))
      .map((user: IResponse) => {
        if (!user.error) {
          user.result[0].image = Constants.imageUrlUser + user.result[0].image;
          user.result[0].lat = +user.result[0].lat;
          user.result[0].lng = +user.result[0].lng;
          return user.result[0];
        }
        throw user.errorMessage;
      });
  }

  getProfile(id: number): Observable<IUser> {
    return this.http.get(Constants.SERVER + "users/" + id)
      .catch(error => Observable.throw("Error trying to get user. Detail: " + error))
      .map((user: IResponse) => {
        if (!user.error) {
          user.result[0].image = Constants.imageUrlUser + user.result[0].image;
          user.result[0].lat = +user.result[0].lat;
          user.result[0].lng = +user.result[0].lng;
          return user.result[0];
        }
        throw user.errorMessage;
      });
  }

  updateProfile(user: IUser): Observable<IUser> {
    return this.http.put(Constants.SERVER + "users/"+ user.id, user)
      .catch(error => Observable.throw("Error trying to update user. Detail: " + error))
      .map((user: IResponse) => {
        if (!user.error) {
          return user.result;
        }
        throw user.errorMessage;
      });
  }
}
