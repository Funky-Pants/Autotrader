import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SellYourCarComponent } from "./sell-your-car/sell-your-car.component";
import { ProfileComponent } from "./profile/profile.component";
import { MyCarsListComponent } from "./my-cars-list/my-cars-list.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

const routes: Routes = [
    { 
      path: 'register',  
      canActivate: [!AuthGuard],
      component: RegisterComponent 
    },
    { 
      path: 'login',  
      canActivate: [!AuthGuard],
      component: LoginComponent 
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
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
    { 
      path: 'email-verification',
      component: VerifyEmailComponent 
    },
    { 
      path: 'forgot-password',
      component: ForgotPasswordComponent 
    },
]

export const AuthRoutingModule = RouterModule.forChild(routes);