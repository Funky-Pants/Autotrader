import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing-module';
import { ProfileComponent } from './profile/profile.component';
import { MyCarsListComponent } from './my-cars-list/my-cars-list.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    MyCarsListComponent,
    //EmailValidatorDirective,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class AuthModule { }
