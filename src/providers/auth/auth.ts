import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { IUser } from '../../interfaces/i-user';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { ResponseOk } from '../../interfaces/response';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  logged = false;
  $loginEmitter: EventEmitter<boolean>;
  private currentUser: IUser;

  constructor(private http: HttpClient, private storage: Storage) {
      this.$loginEmitter = new EventEmitter<boolean>();
  }

   login(loginInfo: IUser): Observable<boolean> {
      return this.http
          .post(Constants.SERVER + 'auth/login', loginInfo)
          .catch((resp: HttpErrorResponse) =>
              Observable.throw(
                  'Error doing login!' +
                      `. Server returned code ${resp.status}, message was: ${resp.message}`
              )
          )
          .map((resp: ResponseOk) => {
              if (!resp.ok) {
                  throw resp.error;
              }else {
                this.storage.set('ap-token', resp.token);
                this.logged = true;
                this.$loginEmitter.emit(true);
                this.currentUser = loginInfo;
                return true;
              }
          });
  }


  /*logout(): boolean {
      localStorage.removeItem('ap-token');
      this.logged = false;
      this.$loginEmitter.emit(false);
      return false;
  }

  isLogged(): Observable<boolean> {
      const TOKEN = localStorage.getItem('ap-token');

      if (this.logged) {
          return Observable.of(true);
      } else if (!this.logged && !TOKEN) {
          return Observable.of(false);
      } else {
        return this.http
        .get(SERVER + 'auth/token')
        .catch((resp: HttpErrorResponse) => {
            console.error(
                'Error in the token!' +
                    `. Server returned code ${resp.status}, message was: ${resp.message}`
            );
            return Observable.of(false);
        })
        .map((resp: ResponseOk) => {
          console.log(resp);
            if (!resp.ok) {
                return false;
            }
            this.logged = true;
            this.$loginEmitter.emit(true);
            return true;
        });
      }
  }

  register(user: IUser): Observable<boolean> {
    return this.http
    .post(SERVER + 'auth/register', user)
    .catch((resp: HttpErrorResponse) =>
        Observable.throw(
            'Error doing register!' +
                `. Server returned code ${resp.status}, message was: ${resp.message}`
        )
    )
    .map((resp: ResponseOk) => {
        if (!resp.ok) {
            throw resp.error;
        }else {
          return true;
        }
    });
  }

  loginGoogle(user: IUser, token: string): Observable<boolean> {
    return this.http
    .post(SERVER + 'auth/google', { user: user, token: token })
    .catch((resp: HttpErrorResponse) =>
        Observable.throw(
            'Error doing login!' +
                `. Server returned code ${resp.status}, message was: ${resp.message}`
        )
    )
    .map((resp: ResponseOk) => {
        if (!resp.ok) {
            throw resp.error;
        }else {
          localStorage.setItem('ap-token', resp.token);
          this.logged = true;
          this.$loginEmitter.emit(true);
          return true;
        }
    });

  }

  loginFacebook(user: IUser, token: any): Observable<boolean> {
    return this.http
    .post(SERVER + 'auth/facebook', { user: user, token: token })
    .catch((resp: HttpErrorResponse) =>
        Observable.throw(
            'Error doing login!' +
                `. Server returned code ${resp.status}, message was: ${resp.message}`
        )
    )
    .map((resp: ResponseOk) => {
        if (!resp.ok) {
            throw resp.error;
        }else {
          localStorage.setItem('ap-token', resp.token);
          this.logged = true;
          this.$loginEmitter.emit(true);
          return true;
        }
    });

  } */

}
