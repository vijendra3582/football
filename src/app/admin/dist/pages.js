"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.adminComponents = void 0;
var header_component_1 = require("./includes/header/header.component");
var sidebar_component_1 = require("./includes/sidebar/sidebar.component");
var footer_component_1 = require("./includes/footer/footer.component");
var login_component_1 = require("./login/login.component");
var forget_component_1 = require("./forget/forget.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var create_component_1 = require("./orgnization/create.component");
var list_component_1 = require("./orgnization/list.component");
var club_component_1 = require("./club/club.component");
var add_edit_club_component_1 = require("./club/add-edit-club.component");
var team_component_1 = require("./team/team.component");
var add_edit_team_component_1 = require("./team/add-edit-team.component");
var player_component_1 = require("./player/player.component");
var add_edit_player_component_1 = require("./player/add-edit-player.component");
exports.adminComponents = [
    header_component_1.HeaderComponent,
    sidebar_component_1.SidebarComponent,
    footer_component_1.FooterComponent,
    login_component_1.LoginComponent,
    forget_component_1.ForgetComponent,
    dashboard_component_1.DashboardComponent,
    create_component_1.OrgnizationCreateComponent,
    list_component_1.OrgnizationListComponent,
    club_component_1.ClubComponent,
    add_edit_club_component_1.AddEditClubComponent,
    team_component_1.TeamComponent,
    add_edit_team_component_1.AddEditTeamComponent,
    player_component_1.PlayerComponent,
    add_edit_player_component_1.AddEditPlayerComponent
];
__exportStar(require("./includes/header/header.component"), exports);
__exportStar(require("./includes/sidebar/sidebar.component"), exports);
__exportStar(require("./includes/footer/footer.component"), exports);
__exportStar(require("./login/login.component"), exports);
__exportStar(require("./forget/forget.component"), exports);
__exportStar(require("./dashboard/dashboard.component"), exports);
__exportStar(require("./orgnization/create.component"), exports);
__exportStar(require("./orgnization/list.component"), exports);
__exportStar(require("./club/club.component"), exports);
__exportStar(require("./club/add-edit-club.component"), exports);
__exportStar(require("./team/team.component"), exports);
__exportStar(require("./team/add-edit-team.component"), exports);
__exportStar(require("./player/player.component"), exports);
__exportStar(require("./player/add-edit-player.component"), exports);
