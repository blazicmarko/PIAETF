import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { UserService } from './services/user.service';
import { UserComponent } from './user/user.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { GuestComponent } from './guest/guest.component';
import { BookComponent } from './book/book.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserViewComponent } from './user-view/user-view.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { PasswordChangeComponent } from './password-forgot/password-change/password-change.component';
import { UserPassChangeComponent } from './user/user-pass-change/user-pass-change.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  exports: [
    MatProgressBarModule
  ],
  declarations: [
    AppComponent,
    MainLoginComponent,
    RegisterComponent,
    AdminComponent,
    UserComponent,
    ModeratorComponent,
    GuestComponent,
    BookComponent,
    UserViewComponent,
    PasswordForgotComponent,
    PasswordChangeComponent,
    UserPassChangeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    BrowserAnimationsModule,

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
