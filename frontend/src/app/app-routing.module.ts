import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent} from './user/user.component';
import {GuestComponent} from './guest/guest.component';
import { BookComponent } from './book/book.component';
import { UserViewComponent } from './user-view/user-view.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { PasswordChangeComponent } from './password-forgot/password-change/password-change.component';
import { UserPassChangeComponent } from './user/user-pass-change/user-pass-change.component';

const routes: Routes = [
  {path: '', component: MainLoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'user', component:UserComponent},
  {path: 'moderator', component:ModeratorComponent},
  {path: 'guest', component:GuestComponent},
  {path: 'book', component:BookComponent},
  {path: 'userView', component:UserViewComponent},
  {path: 'forgotPass', component:PasswordForgotComponent},
  {path: 'password', component:PasswordChangeComponent},
  {path: 'user/password', component:UserPassChangeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
