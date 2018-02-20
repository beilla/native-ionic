import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { IUser } from '../../interfaces/i-user';

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

  user: IUser={
    name: '',
    email: '',
    password: '',
    avatar: '',
    lat: 38,
    lng: 0
  };

  constructor(public navCtrl: NavController, public authService: AuthProvider,
              public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

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

}
