import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IEvent } from '../../interfaces/i-event';
import { Storage } from '@ionic/storage';
import { IUser } from '../../interfaces/i-user';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { EventProvider } from '../../providers/event/event';

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
  event: IEvent = {
    title: '',
    date: '',
    description: '',
    image: '',
    price: 0,
    address: '',
    lat: 0,
    lng: 0
  };
  user: IUser = {
    id: -1,
    name: "",
    email: "",
    password: "",
    image: "",
    lat: 0,
    lng: 0
  };

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthProvider, private userService: UserProvider, private alertCtrl: AlertController,
    private eventService: EventProvider) {
    this.event = this.navParams.data;
    //console.log(this.navParams.data);

    if (!this.event.creatorData) {
      this.event.creatorData = {
        id: -1,
        email: "",
        password: "",
        image: "",
        lat: 0,
        lng: 0,
        name: ""
      };
      this.userService.getProfile(this.event.creator).subscribe(
        user => this.event.creatorData = user
      );
    }
    this.userService.getMe().subscribe(
      user => this.user = user
    );
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
    console.log('ionViewDidLoad InfoPage');
  }

  delete() {
    let alert = this.alertCtrl.create({
      title: 'Delete this event',
      message: 'Do you want to delete this event?',
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Delete',
        handler:()=>{
          this.eventService.removeEvent(this.event.id).subscribe(
            () => this.navCtrl.setRoot('EventListPage'),
            (error) =>{
              let alert = this.alertCtrl.create({
                title: 'Error deleted!',
                subTitle: error,
                buttons: ['Ok']
              });
              alert.present();
            }
          );
        }
      }]
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
