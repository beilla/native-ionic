import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../interfaces/i-event';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.data;
    //console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

  getUser(user) {
    if (!this.event.mine)
      this.navCtrl.parent.parent.push('ProfilePage', user);
    else
      this.navCtrl.parent.parent.push('ProfilePage');
  }

  goBack() {
    this.navCtrl.parent.parent.pop();
  }
}
