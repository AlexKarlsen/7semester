import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WorkoutsListComponent } from './workouts-list.component';
import { WorkoutDetailComponent } from './workout-detail.component';
import { WorkoutFormComponent } from './workout-form.component'; 
import { ExerciseFormComponent } from './exercise-form.component';
import { RegisterFormComponent } from './register-form.component';
import { LoginFormComponent } from './login-form.component';
import { AuthenticationService } from './authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutsListComponent,
    WorkoutDetailComponent,
    WorkoutFormComponent,
    ExerciseFormComponent,
    RegisterFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)
    HttpClientModule, // After browser module
  ],
  providers: [AuthenticationService], // provide AuthenticationService for dependency injection
  bootstrap: [AppComponent]
})
export class AppModule { }
