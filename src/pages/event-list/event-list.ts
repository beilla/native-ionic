import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { IEvent } from '../../interfaces/i-event';

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
  events: IEvent[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eventService: EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }


  ionViewDidEnter() {
    this.getEvents();
  }

  refreshItems(refresher: Refresher) {
    this.getEvents();
    refresher.complete();
  }

  newEvent() {
    this.navCtrl.push('NewEventPage');
  }

    getEvents() {
    this.eventService.getEvents().subscribe( response => {
      this.events = response;
    });
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
