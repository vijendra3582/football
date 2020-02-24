import { HeaderComponent } from './includes/header/header.component';
import { SidebarComponent } from './includes/sidebar/sidebar.component';
import { FooterComponent } from './includes/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcademyCreateComponent } from './academy/create.component';
import { AcademyListComponent } from './academy/list.component';

export const adminComponents = [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    ForgetComponent,
    DashboardComponent,
    AcademyCreateComponent,
    AcademyListComponent
];


export * from './includes/header/header.component';
export * from './includes/sidebar/sidebar.component';
export * from './includes/footer/footer.component';
export * from './login/login.component';
export * from './forget/forget.component';
export * from './dashboard/dashboard.component';
export * from './academy/create.component';
export * from './academy/list.component';
