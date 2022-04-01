import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    HomeComponent,
    AllCarsComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ]
})
export class PagesModule { }
