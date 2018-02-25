import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { IEvent } from '../../interfaces/i-event';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the AttendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attend',
  templateUrl: 'attend.html',
})
export class AttendPage {
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
  users: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eventsService: EventProvider, private alertCtrl: AlertController,
    public authService: AuthProvider) {
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

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AttendPage');
    this.eventsService.getAttendsEventUser(this.event.id).subscribe(
      usersattend => this.users = usersattend,
      (error) => this.showErrorAttend(error));
      //console.log(this.users);
  }

  private showErrorAttend(error) {
    let alert = this.alertCtrl.create({
      title: 'Show attend error',
      subTitle: error,
      buttons: ['Ok']
    });
    alert.present();
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
