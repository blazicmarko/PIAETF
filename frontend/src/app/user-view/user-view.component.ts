import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  toFolloww : string;
  followerr : string;
  user : User;
  follower : User;
  toFollow : User;
  allreadyFollows : boolean;
  message : string;

  constructor(private userService : UserService) { }

  ngOnInit(): void {

    this.allreadyFollows = false;
    this.toFollow = new User();
    this.toFolloww = sessionStorage.getItem("profile");
    this.followerr = sessionStorage.getItem("username");
    this.userService.getUser(this.toFolloww).subscribe(user => {
      this.toFollow = user[0];
    })

  }

  follow(){
    this.toFollow = new User();
    this.follower = new User()
    this.toFolloww = sessionStorage.getItem("profile");
    this.userService.getUser(this.toFolloww).subscribe(user => {
      this.toFollow = user[0];
      this.followerr = sessionStorage.getItem("username");
      this.userService.getUser(this.followerr).subscribe(user => {
      this.follower = user[0];
      for(let i =0; i < this.follower.follows.length; i++){
        if(this.follower.follows[i]==this.toFollow.username){
          this.allreadyFollows = true;
        }
      }
      if(!this.allreadyFollows){
        this.follower.follows.push(this.toFollow.username);
      this.toFollow.followers.push(this.follower.username);
      this.userService.changeUser(this.follower).subscribe(user => {
        if(user['respond']=='ok'){
          this.message='Uspesno ste zapratili';
        }
        else this.message = "Niste uspesno zapratili";

      });
      this.userService.changeUser(this.toFollow).subscribe(user => {
        if(user['respond']=='ok'){
          this.message='Uspesno ste zapratili';
        }
        else this.message = "Niste uspesno zapratili";

      });
      }
      else {
        this.message = "Vec pratite ovaj profil";
        this.allreadyFollows = false;
      }

    })
  })

  }
}
