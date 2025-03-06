import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login/login.component';
import { GoogleButtonComponent } from './login/google-button/google-button.component';



@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    HomeComponent,
    GoogleButtonComponent
  ],
  imports: [
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
