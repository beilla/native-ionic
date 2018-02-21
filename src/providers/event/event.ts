import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../../interfaces/i-event';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../constants';
import { IResponse } from '../../interfaces/response';

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

  getEvents(): Observable<IEvent[]> {
    return this.http
      .get(Constants.SERVER + 'events')
      .catch((resp: HttpErrorResponse) =>
        Observable.throw(
          'Error getting events!' +
          `. Server returned code ${resp.status}, message was: ${resp.message}`
        )
      )
      .map((resp: IResponse) => {
        return resp.result.map((event: IEvent) => {
          event.image = Constants.imageUrlEvent+ `${event.image}`;
          event.creatorData.image = Constants.imageUrlUser+`${event.creatorData.image}`;
          return event;
        });
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
        resp.result.image =  Constants.imageUrlEvent+`${resp.result.image}`;
        resp.result.creatorData.image = Constants.imageUrlUser+`${resp.result.creatorData.image}`;
        return resp.result;
      });
  }

}
