import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SellYourCarComponent } from "./sell-your-car/sell-your-car.component";
import { ProfileComponent } from "./profile/profile.component";
import { MyCarsListComponent } from "./my-cars-list/my-cars-list.component";

const routes: Routes = [
    { 
      path: 'register',  
      component: RegisterComponent 
    },
    { 
      path: 'login',  
      component: LoginComponent 
    },
    {
        path: 'profile',
        // canActivate: [AuthGuard],
        component: ProfileComponent,
    },
    { 
      path: 'sell-your-car',
      //canActivate: [AuthGuard],
      component: SellYourCarComponent 
    },
    { 
      path: 'my-cars-list',
      //canActivate: [AuthGuard],
      component: MyCarsListComponent 
    },
]

export const AuthRoutingModule = RouterModule.forChild(routes);