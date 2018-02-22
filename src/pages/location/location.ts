import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../interfaces/i-event';
import { AgmCoreModule } from '@agm/core';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  event: IEvent;
  lat = 38.4039418;
  lng = -0.5288701;
  zoom = 17;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.lat = this.event.lat;
    this.lng = this.event.lng;
  }

  goBack() {
    this.navCtrl.parent.parent.pop();
  }
}
