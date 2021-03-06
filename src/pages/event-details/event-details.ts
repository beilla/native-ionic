import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../interfaces/i-event';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EventDetailsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsPage {

  infoRoot = 'InfoPage'
  locationRoot = 'LocationPage'
  attendRoot = 'AttendPage'
  event:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider) {
    console.log(this.navParams.data);
    this.event = this.navParams.data;
  }

  ionViewCanEnter() {
    this.authService.isLogged()
      .subscribe((ok) => {
        if(!ok){
          this.navCtrl.setRoot('LoginPage')}
        });
  }
}
