import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit {

  email : string
  message : string

  constructor(private userService : UserService) { }

  ngOnInit(): void {

  }


  send(){
    console.log(this.email);
    this.userService.forgotPass(this.email).subscribe(user=>{
      if(user['respond']=='ok'){
        this.message='Zahtev promenu lozinke poslat. Udjite na vas mejl';
        console.log(this.message);
      }
      if(user['respond']=='not ok'){
        this.message='Greska';
        console.log(this.message);
      }
      if(user['respond']=='no mail'){
        this.message='Ovaj mejl ne postoji u sistemu';
        console.log(this.message);
      }
  });
}
}
