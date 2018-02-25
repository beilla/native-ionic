import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../../interfaces/i-event';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../constants';
import { IResponse } from '../../interfaces/response';
import { IUser } from '../../interfaces/i-user';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EventProvider Provider');
  }


  addEvent(event: IEvent): Observable<boolean> {
    // console.log(event);
    return this.http
      .post(Constants.SERVER + 'events', event)
      .catch((resp: HttpErrorResponse) =>
        Observable.throw('Error adding!')
      )
      .map((resp: IResponse) => {
        if (resp.error) {
          throw resp.errorMessage;
        }
        return true;
      });
  }

  getEvents(n: number): Observable<IEvent[]> {
    return this.http
      .get(Constants.SERVER + 'events/' + n)
      .catch((resp: HttpErrorResponse) =>
        Observable.throw(
          'Error getting events!' +
          `. Server returned code ${resp.status}, message was: ${resp.message}`
        )
      )
      .map((resp: IResponse) => {
        if (!resp.error) {
         resp.result.map((event: IEvent) => {
          event.image = Constants.imageUrlEvent+ `${event.image}`;
          event.creatorData.image = Constants.imageUrlUser+`${event.creatorData.image}`;
          event.lat = +event.lat;
          event.lng = +event.lng;
          event.creatorData.lat = +event.creatorData.lat;
          event.creatorData.lng = +event.creatorData.lng;
        });
        return resp.result;
      }
      throw resp.errorMessage;
    });
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http
      .get(Constants.SERVER + 'events' + `/${id}`)
      .catch((resp: HttpErrorResponse) =>
        Observable.throw(
          'Error getting events!' +
          `. Server returned code ${resp.status}, message was: ${resp.message}`
        )
      )
      .map((resp: IResponse) => {
        if (!resp.error) {
        resp.result.image =  Constants.imageUrlEvent+`${resp.result.image}`;
        resp.result.creatorData.image = Constants.imageUrlUser+`${resp.result.creatorData.image}`;
        return resp.result;
      }
      throw resp.errorMessage;
    });
  }

  getAttendsEventUser(id: number): Observable<IUser[]> {
    return this.http.get(Constants.SERVER + "events/attend/" + id)
      .catch((error: HttpErrorResponse) => Observable.throw(`Error trying to get attends events. Server returned ${error.message}`))
      .map((resp: IResponse) => {
        if (!resp.error) {
          resp.result.forEach((user: any) => {
            // user.image = Environment.imageUrlUser + user.image;
            user.userData.image = Constants.imageUrlUser + user.userData.image;

          });
          return resp.result;
        }
        throw resp.errorMessage;
      });
  }

  getEventsAttends(idUser:Number): Observable<IEvent[]> {
    return this.http.get(Constants.SERVER + "users/attend/"+idUser)
      .catch((error: HttpErrorResponse) => Observable.throw(`Error trying to get events. Server returned ${error.message}`))
      .map((resp: IResponse) => {
        resp.result.forEach((event: any) => {
          event.eventData.image = Constants.imageUrlEvent + event.eventData.image;
        });
        return resp.result;
      });
  }

  getEventsCreated(idUser: number): Observable<IEvent[]> {
    return this.http.get(Constants.SERVER + "events/created/" + idUser)
      .catch((error: HttpErrorResponse) => Observable.throw(`Error trying to get events. Server returned ${error.message}`))
      .map((resp: IResponse) => {
        resp.result.forEach((event: IEvent) => {
          event.image = Constants.imageUrlEvent + event.image;
        });
        return resp.result;
      });
  }

  removeEvent(id: number): Observable<boolean> {
    return this.http.delete(Constants.SERVER + "events/" + id)
      .catch((error: HttpErrorResponse) => Observable.throw(`Error trying to get events. Server returned ${error.message}`))
      .map((resp: IResponse) => {
        if (!resp.error) {
          return true;
        }
        throw resp.errorMessage;
      });
  }
}
