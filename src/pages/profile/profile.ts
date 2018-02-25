import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IUser } from '../../interfaces/i-user';
import { EventProvider } from '../../providers/event/event';
import { UserProvider } from '../../providers/user/user';
import { IEvent } from '../../interfaces/i-event';
import { AuthProvider } from '../../providers/auth/auth';

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
  profile:IUser={
    id:-1,
    name: "",
    email: "",
    password: "",
    image: "",
    lat: 0,
    lng: 0
  };

  eventsAttend: IEvent[];
  eventsCreated: IEvent[];
  me: boolean;
  profilesviews:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventProvider,
   private userService: UserProvider, public authService: AuthProvider) {
     this.me=false;
     this.profilesviews='profile';
    if (this.navParams.data.email) {
      this.me=false;
      this.profile = this.navParams.data;
      this.getEvents(this.profile.id);
    } else {
        this.me=true;
        this.userService.getMe().subscribe( (user) =>{
          this.profile = user;
          console.log(user);
          this.getEvents(this.profile.id);
      });
    }
  }

  getEvents(id){
    this.eventService.getEventsAttends(id).subscribe( eventsattend =>{
      this.eventsAttend = eventsattend;
      console.log('attend',eventsattend);
    });
    this.eventService.getEventsCreated(id).subscribe( eventscreated =>{
      this.eventsCreated = eventscreated;
      console.log('created',eventscreated);
    });
  }

  ionViewCanEnter() {
    this.authService.isLogged()
      .subscribe((ok) => {
        if(!ok){
          this.navCtrl.setRoot('LoginPage')}
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    /* this.userService.getMe().subscribe( result =>{
      this.profile = result;
      console.log(result);
  }); */
  }

  goDetail(event: any) {
    console.log(event);
    this.navCtrl.push("EventDetailPage", event);
  }

  goRegister(profile: any) {
    console.log(profile);
    this.navCtrl.push("RegisterPage", profile);
  }

}
