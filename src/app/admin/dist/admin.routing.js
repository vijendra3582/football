"use strict";
exports.__esModule = true;
exports.adminRoutes = void 0;
var pages_1 = require("./pages");
var auth_guard_1 = require("./../guards/auth.guard");
var login_guard_1 = require("./../guards/login.guard");
exports.adminRoutes = [
    {
        path: '',
        canActivate: [login_guard_1.LoginGuard],
        component: pages_1.LoginComponent
    },
    {
        path: "login",
        canActivate: [login_guard_1.LoginGuard],
        component: pages_1.LoginComponent
    },
    {
        path: "forget",
        canActivate: [login_guard_1.LoginGuard],
        component: pages_1.ForgetComponent
    },
    {
        path: "dashboard",
        canActivate: [auth_guard_1.AuthGuard],
        component: pages_1.DashboardComponent
    },
    {
        path: "orgnization",
        canActivate: [auth_guard_1.AuthGuard],
        canActivateChild: [auth_guard_1.AuthGuard],
        children: [
            { path: "create", component: pages_1.OrgnizationCreateComponent },
            { path: "edit/:id", component: pages_1.OrgnizationCreateComponent },
            { path: "manage", component: pages_1.OrgnizationListComponent },
        ]
    },
    {
        path: "club",
        canActivate: [auth_guard_1.AuthGuard],
        canActivateChild: [auth_guard_1.AuthGuard],
        children: [
            { path: "create", component: pages_1.AddEditClubComponent },
            { path: "edit/:id", component: pages_1.AddEditClubComponent },
            { path: "manage", component: pages_1.ClubComponent },
        ]
    },
    {
        path: "team",
        canActivate: [auth_guard_1.AuthGuard],
        canActivateChild: [auth_guard_1.AuthGuard],
        children: [
            { path: "create", component: pages_1.AddEditTeamComponent },
            { path: "edit/:id", component: pages_1.AddEditTeamComponent },
            { path: "manage", component: pages_1.TeamComponent },
        ]
    }
];
