import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../interfaces/i-event';
import { AgmCoreModule } from '@agm/core';
import { AuthProvider } from '../../providers/auth/auth';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

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
  event: IEvent= {
    title: '',
    date: '',
    description: '',
    image: '',
    price: 0,
    address: '',
    lat: 0,
    lng: 0
  };
  lat = 0;
  lng = 0;
  zoom = 17;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider,
    private launchNavigator: LaunchNavigator) {
    this.event=this.navParams.data;
  }

  ionViewCanEnter() {
    this.authService.isLogged()
      .subscribe((ok) => {
        if(!ok){
          this.navCtrl.setRoot('LoginPage')}
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.lat = this.event.lat;
    this.lng = this.event.lng;
  }

  laumchNavigation(){
    this.launchNavigator.navigate([this.event.lat, this.event.lng], {}).then(ok =>
      console.log("Navigation ok!"));
  }

  goBack() {
    this.navCtrl.parent.parent.pop();
  }
}
