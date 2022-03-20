//import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
    path: '**', 
    pathMatch: 'full',   
    component: NotFoundComponent 
  },
];
export const AppRoutingModule = RouterModule.forRoot(routes);
