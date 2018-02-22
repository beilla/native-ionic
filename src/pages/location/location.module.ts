import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    LocationPage
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4MapVgMAXzaISZKYZOm5wqJz0Su1M3OA',
      libraries: ['places']
      })
  ],
})
export class LocationPageModule {}
