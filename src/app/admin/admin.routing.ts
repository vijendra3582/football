import {
    DashboardComponent,
    LoginComponent,
    ForgetComponent,
    OrgnizationCreateComponent,
    OrgnizationListComponent,
    AddEditClubComponent,
    ClubComponent,
    AddEditTeamComponent,
    TeamComponent,
    AddEditPlayerComponent,
    PlayerComponent
} from './pages';
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
        path: "orgnization",
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: "create", component: OrgnizationCreateComponent },
            { path: "edit/:id", component: OrgnizationCreateComponent },
            { path: "manage", component: OrgnizationListComponent },
        ]
    },
    {
        path: "club",
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: "create", component: AddEditClubComponent },
            { path: "edit/:id", component: AddEditClubComponent },
            { path: "manage", component: ClubComponent },
        ]
    },
    {
        path: "team",
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: "create", component: AddEditTeamComponent },
            { path: "edit/:id", component: AddEditTeamComponent },
            { path: "manage", component: TeamComponent },
        ]
    },
    {
        path: "player",
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: "create", component: AddEditPlayerComponent },
            { path: "edit/:id", component: AddEditPlayerComponent },
            { path: "manage", component: PlayerComponent },
        ]
    }
];