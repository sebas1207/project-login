import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
export const routes: Routes = [
    { path:'login', component:LoginComponent },
    { path:'',redirectTo:'/login', pathMatch:'full'}
];
