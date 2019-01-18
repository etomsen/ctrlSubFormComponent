import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonalDetailsComponent } from './personal-details.component';
import { GenderComponent } from './gender.component';
import { PassengerListComponent } from './passenger-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalDetailsComponent,
    GenderComponent,
    PassengerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
