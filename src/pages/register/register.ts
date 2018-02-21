import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IUser } from '../../interfaces/i-user';
import { AuthProvider } from '../../providers/auth/auth';

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
    image: '',
    lat: 38,
    lng: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this.authService.register(this.user).subscribe(
      response => this.navCtrl.setRoot('EventListPage'),
      (error) => this.showErrorLogin(error));
  }

  private showErrorLogin(error) {
    let alert = this.alertCtrl.create({
      title: 'Login error',
      subTitle: error,
      buttons: ['Ok']
    });
    alert.present();
  }
}
