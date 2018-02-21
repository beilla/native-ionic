import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IUser } from '../../interfaces/i-user';
import { AuthProvider } from '../../providers/auth/auth';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  cameraImage: any;
  user: IUser ={
    name: '',
    email: '',
    password: '',
    password2: '',
    image: '',
    lat: 38,
    lng: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider,
    private alertCtrl: AlertController, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ionViewWillLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.user.lat = resp.coords.latitude;
      this.user.lng = resp.coords.longitude;
       console.log(this.user.lat,this.user.lng);
    }).catch((error) => {
       console.log('Error getting location', error);
    });

  }

  register() {
    if (this.user.password == this.user.password2){
      this.authService.register(this.user).subscribe(
        response => this.navCtrl.setRoot('EventListPage'),
        (error) => this.showErrorRegister(error));
    }else{
      let alert = this.alertCtrl.create({
        title: 'Password error',
        subTitle: 'Passwords don´t match',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  private showErrorRegister(error) {
    let alert = this.alertCtrl.create({
      title: 'Login error',
      subTitle: error,
      buttons: ['Ok']
    });
    alert.present();
  }
}
