import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4MapVgMAXzaISZKYZOm5wqJz0Su1M3OA',
      libraries: ['places']
      })
  ],
})
export class ProfilePageModule {}
