import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css']
})
export class MainLoginComponent implements OnInit {

  username: string;
  password: string;

  message: string;


  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {

  }

  login():void{
    this.service.login(this.username, this.password).subscribe((user: User)=>{
      if(user[0]){
        if(user[0].type=='user') {
          this.router.navigate(['/user']);
          sessionStorage.setItem("user","user");
          sessionStorage.setItem("username",this.username);
        }

        else
        if(user[0].type=='moderator'){
          this.router.navigate(['/user']);
          sessionStorage.setItem("user","moderator");
          sessionStorage.setItem("username",this.username);

        }
        else this.router.navigate(['/admin']);
      }
      else{
        this.message = "Niste tacno uneli podatke";
      }

    })
  }
}
