//import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AllCarsComponent } from './pages/all-cars/all-cars.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  { 
    path: 'all-cars',
    component: AllCarsComponent 
  },
  { 
    path: 'car-details',
    component: CarDetailsComponent 
  },
  { 
    path: '**',  
    component: NotFoundComponent 
  },
];
export const AppRoutingModule = RouterModule.forRoot(routes);
