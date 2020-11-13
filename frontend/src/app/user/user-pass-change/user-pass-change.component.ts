import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-pass-change',
  templateUrl: './user-pass-change.component.html',
  styleUrls: ['./user-pass-change.component.css']
})
export class UserPassChangeComponent implements OnInit {

  username : string;
  user : User;
  oldPass : string;
  newPass : string;
  secpassword : string;

  message : string;

  constructor(private router: Router,private userService : UserService) { }

  ngOnInit(): void {

    this.username=sessionStorage.getItem("username")
    console.log(this.username);
    this.user= new User();
    this.userService.getUser(this.username).subscribe(user => {
      this.user = user[0];
      console.log(this.user);
    })
  }

  changePass() :boolean{
    if(this.user.password == this.oldPass){
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
    }

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
