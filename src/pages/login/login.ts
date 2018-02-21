import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { IUser } from '../../interfaces/i-user';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isLogged = false;
  user: IUser={
    name: '',
    email: '',
    password: '',
    image: '',
    lat: 38,
    lng: 0
  };

  constructor(public navCtrl: NavController, public authService: AuthProvider,
              public alertCtrl: AlertController, private geolocation: Geolocation) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.authService.isLogged()
      .subscribe((ok) => {
        if(ok){
          this.navCtrl.setRoot('EventListPage')}
        });
  }

  ionViewWillLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.user.lat = resp.coords.latitude;
      this.user.lng = resp.coords.longitude;
      // console.log(this.user.lat,this.user.lng);
    }).catch((error) => {
       console.log('Error getting location', error);
    });

  }

  login() {
    console.log(this.user);
    this.authService.login(this.user)
      .subscribe(
        () => this.navCtrl.setRoot('EventListPage'),
        (error) => this.showErrorLogin(error)
      );
  }

  private showErrorLogin(error) {
    let alert = this.alertCtrl.create({
      title: 'Login error',
      subTitle: error,
      buttons: ['Ok']
    });
    alert.present();
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }
}
