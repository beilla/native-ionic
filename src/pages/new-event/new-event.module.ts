import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEventPage } from './new-event';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    NewEventPage
  ],
  imports: [
    IonicPageModule.forChild(NewEventPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4MapVgMAXzaISZKYZOm5wqJz0Su1M3OA',
      libraries: ['places']
      })
  ],
})
export class NewEventPageModule {}
