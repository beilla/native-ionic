import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { IEvent } from '../../interfaces/i-event';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the NewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {
  event: IEvent = {
    title: '',
    date: '',
    description: '',
    image: '',
    price: 0,
    address: '',
    lat: 0,
    lng: 0
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eventService: EventProvider, private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEventPage');
  }

  create() {
    console.log(this.event);
    this.eventService.addEvent(this.event).subscribe(
      response => this.navCtrl.pop(),
      (error) =>{
        this.alertCtrl.create({
          title: 'Error',
          subTitle: error,
          buttons: ['Ok']
        });
      });
  }
}


