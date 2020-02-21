import { DashboardComponent, LoginComponent, ForgetComponent } from './pages';
import { Routes } from '@angular/router';
import { AuthGuard } from './../guards/auth.guard';
import { LoginGuard } from './../guards/login.guard';

export const adminRoutes: Routes = [
    {
        path: '',
        canActivate: [LoginGuard],
        component: LoginComponent
    },
    {
        path: "login",
        canActivate: [LoginGuard],
        component: LoginComponent
    },
    { 
        path: "forget", 
        canActivate: [LoginGuard],
        component: ForgetComponent 
    },
    {
        path: "dashboard",
        canActivate: [AuthGuard],
        component: DashboardComponent
    }
];