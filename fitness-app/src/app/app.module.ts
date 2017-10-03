import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
// Import HttpClientModule from @angular/common/http
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { WorkoutsListComponent } from './workouts-list.component';
import { WorkoutDetailComponent } from './workout-detail.component';
import { WorkoutFormComponent } from './workout-form.component'; 
import { ExerciseFormComponent } from './exercise-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutsListComponent,
    WorkoutDetailComponent,
    WorkoutFormComponent,
    ExerciseFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)
    HttpClientModule, // After browser module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
