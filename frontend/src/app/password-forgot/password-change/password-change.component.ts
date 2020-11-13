import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  email : string;
  user : User;
  newPass : string;
  secpassword : string;

  message : string;

  constructor(private router: Router,private userService : UserService) { }

  ngOnInit(): void {
    this.email = window.location.href.split("?")[1];
    this.email=this.email.slice(0,this.email.length-1);
    console.log(this.email);
    this.user= new User();
    this.userService.getUserByEmail(this.email).subscribe(user => {
      this.user = user[0];
      console.log(this.user);
    })
  }

  changePass() :boolean{
    this.user.password = this.newPass;
    this.userService.changeUser(this.user).subscribe(respond => {
      if (respond['respond'] == 'ok') {
        this.message = "Promenjeni podaci";
        alert("Uspesno ste promenili lozinku!");
        this.router.navigateByUrl("/");
      return true;}
      else {
        this.message = "Greska";
        return false;}
    })
    return false;
  }

  checkPass() {
    if (this.secpassword == this.newPass) {
      return true;
    }
    else {
      return false;
    }
  }

}
