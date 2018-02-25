import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IUser } from '../../interfaces/i-user';
import { AuthProvider } from '../../providers/auth/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserProvider } from '../../providers/user/user';

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
    id:-1,
    name: '',
    email: '',
    password: '',
    password2: '',
    image: '',
    lat: 38,
    lng: 0
  };
  edit:boolean;
  actualImage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthProvider,
    private alertCtrl: AlertController, private geolocation: Geolocation, private camera: Camera,
    private userService: UserProvider) {
      this.edit=false;
      if (this.navParams.data.email) {
        this.user = this.navParams.data;
        this.user.password="";
        this.edit=true;
      }else{
        this.edit=false;
      }
      this.actualImage= this.user.image;
      this.user.image="";
  }

  /* ionViewCanEnter() {
    this.authService.isLogged()
      .subscribe((error) => {
        if(error){
          this.navCtrl.setRoot('LoginPage')}
        });
  } */

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
    if(this.edit){
      if(this.user.password!=""){
        if (this.user.password == this.user.password2){
          this.userService.updateProfile(this.user).subscribe(
            response => this.navCtrl.setRoot('ProfilePage'),
            (error) => this.showErrorRegister(error));
        }else{
          let alert = this.alertCtrl.create({
            title: 'Password error',
            subTitle: 'Passwords don´t match',
            buttons: ['Ok']
          });
          alert.present();
        }
      }else{
        this.userService.updateProfile(this.user).subscribe(
          response => this.navCtrl.setRoot('ProfilePage'),
          (error) => this.showErrorRegister(error));
      }
    }else{
      if (this.user.password == this.user.password2){
        this.authService.register(this.user).subscribe(
          response => this.navCtrl.setRoot('LoginPage'),
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
  }

  private showErrorRegister(error) {
    let alert = this.alertCtrl.create({
      title: 'Register error',
      subTitle: error,
      buttons: ['Ok']
    });
    alert.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.getPicture(options);

  }

  pickFromGallery() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 640,
      targetHeight: 640,
      destinationType: this.camera.DestinationType.DATA_URL
    }

    this.getPicture(options);
  }

  private getPicture(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      this.user.image = 'data:image/jpeg;base64,' + imageData;
      this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Take picture ok',
        buttons: ['Ok']
      });
    }).catch( error => {
      this.alertCtrl.create({
        title: 'Error',
        subTitle: error,
        buttons: ['Ok']
      });
    });
  }
}
