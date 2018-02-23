import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IUser } from '../../interfaces/i-user';
import { EventProvider } from '../../providers/event/event';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user:IUser={
    name: "",
    email: "",
    password: "",
    image: "",
    lat: 0,
    lng: 0
  };
  profile:IUser={
    name: "",
    email: "",
    password: "",
    image: "",
    lat: 0,
    lng: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, eventService: EventProvider,
   private userService: UserProvider) {
    if (this.navParams.data.email) {
      this.profile = this.navParams.data;
    } else {
        this.userService.getMe().subscribe( (user) =>{
          this.profile = user;
          console.log(user);
          /* this.profile.image = Environment.imageUrlUser + this.profile.image;
          this.eventService.getEventsAttends(this.profile.id).subscribe(
            events => this.eventsAttend = events
          );

          this.eventService.getEventsCreated(this.profile.id).subscribe(
            events => this.eventsCreated = events
          ); */
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    /* this.userService.getMe().subscribe( result =>{
      this.profile = result;
      console.log(result);
  }); */
  }

}
