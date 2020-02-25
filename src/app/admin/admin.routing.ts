import { DashboardComponent, LoginComponent, ForgetComponent, AcademyCreateComponent, AcademyListComponent } from './pages';
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
    },
    {
        path: "academy",
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: "create", component: AcademyCreateComponent },
            { path: "edit/:id", component: AcademyCreateComponent },
            { path: "manage", component: AcademyListComponent },
        ]
    }
];