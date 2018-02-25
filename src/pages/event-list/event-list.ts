import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { IEvent } from '../../interfaces/i-event';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  events: IEvent[] = [];
  n: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eventService: EventProvider, public authService: AuthProvider) {
  }

  ionViewCanEnter() {
    this.authService.isLogged()
      .subscribe((ok) => {
        if (!ok) {
          this.navCtrl.setRoot('LoginPage')
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
    this.getEvents().subscribe(response => {
      this.events.push(...response);
    });
  }

  ionViewDidEnter() {

  }

  refreshItems(refresher: Refresher) {
    this.eventService.getEvents(0).subscribe(response => {
      this.events = response;
      this.n = 1;
    },
      () => refresher.complete()
    );

  }

  doInfinite(infiniteScroll) {
    this.n += 8;
    this.getEvents().subscribe(
      response => this.events.push(...response),
      (error)=>infiniteScroll.complete(),
      () => infiniteScroll.complete()
    );
  }

  getEvents() {
    return this.eventService.getEvents(this.n);
  }

  newEvent() {
    this.navCtrl.push('NewEventPage');
  }

  getUser(event) {
    if (!event.mine)
      this.navCtrl.push('ProfilePage', event.creatorData);
    else
      this.navCtrl.push('ProfilePage');
  }

  getDetails(event) {
    this.navCtrl.push('EventDetailsPage', event);
  }
}
