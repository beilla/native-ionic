import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { IEvent } from '../../interfaces/i-event';
import { EventProvider } from '../../providers/event/event';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GmapsAutocompleteDirective } from '../../providers/gmaps-autocomplete.directive';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the NewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {
  event: IEvent = {
    title: '',
    date: '',
    description: '',
    image: '',
    price: 0,
    address: '',
    lat: 0,
    lng: 0
  }

  lat = 38.4039418;
  lng = -0.5288701;
  zoom = 17;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eventService: EventProvider, private alertCtrl: AlertController, public authService: AuthProvider,
    private actionSheetCtrl: ActionSheetController, private camera: Camera, private geolocation: Geolocation) {
  }

  ionViewCanEnter() {
    this.authService.isLogged()
      .subscribe((ok) => {
        if(!ok){
          this.navCtrl.setRoot('LoginPage')}
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEventPage');
  }

  ionViewWillLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.event.lat = resp.coords.latitude;
      this.event.lng = resp.coords.longitude;
       console.log(this.event.lat,this.event.lng);
    }).catch((error) => {
       console.log('Error getting location', error);
    });
  }

  changePosition( place: google.maps.places.PlaceResult) {
    // console.log(place);
    this.event.lat = place.geometry.location.lat();
    this.event.lng = place.geometry.location.lng();
    this.event.address = place.formatted_address;
  }

  create() {
    console.log(this.event);
    this.eventService.addEvent(this.event).subscribe(
      response => this.navCtrl.pop(),
      (error) =>{
        this.alertCtrl.create({
          title: 'Error',
          subTitle: error,
          buttons: ['Ok']
        });
      });
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
      this.event.image = 'data:image/jpeg;base64,' + imageData;
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


