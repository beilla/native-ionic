import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
import { IResponse } from '../../interfaces/response';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  logged = false;
  private currentUser: IUser;

  constructor(private http: HttpClient, private storage: Storage) {

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
      .map((resp: IResponse) => {
        if (resp.error) {
          throw resp.errorMessage;
        } else {
          this.storage.set('token', resp.token);
          this.logged = true;
          this.currentUser = loginInfo;
          return true;
        }
      });
  }


  logout(): boolean {
    this.storage.remove('token');
    this.logged = false;
    return false;
  }


  isLogged(): Observable<boolean> {
    return Observable.create(observer => {
      this.storage.get('token').then(() => {
        return this.http
          .get(Constants.SERVER + 'auth/token')
          .catch((resp: HttpErrorResponse) => {
            return Observable.throw(
              'Error in the token!' +
              `. Server returned code ${resp.status}, message was: ${resp.message}`
            );
          })
          .map((resp: IResponse) => {
            //console.log(resp);
            if (resp.error) {
              observer.next(false);
            }
            this.logged = true;
            observer.next(true);
          });
      }).catch(() => {
        observer.next(false);
      });
    });
  }

  register(user: IUser): Observable<boolean> {
    return this.http
      .post(Constants.SERVER + 'auth/register', user)
      .catch((resp: HttpErrorResponse) =>
        Observable.throw(
          'Error doing register!' +
          `. Server returned code ${resp.status}, message was: ${resp.message}`
        )
      )
      .map((resp: IResponse) => {
        if (resp.error) {
          throw resp.errorMessage;
        } else {
          return true;
        }
      });
  }

  /*
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
