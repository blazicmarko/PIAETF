import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {

  user: User;
  message: String;
  recaptcha: any[];
  secpassword: String;



  constructor(private router: Router, private service: UserService) { }

  ngOnInit(): void {

    this.user = new User();
    this.user.type = "user";
    this.secpassword= "";
  }

  register():boolean{
    if (this.secpassword == this.user.password) {
    this.service.register(this.user,this.recaptcha).subscribe(user=>{
      if(user['request']=='ok'){
        this.message='Zahtev za registraciju uspesno poslat';
        return true;
      }
      else if(user['request']== 'not ok'){
        this.message='Zahtev za registraciju nije uspesno poslat';
      }
      else if(user['request']== 'recaptcha failed'){
        this.message='Koristili ste dva puta istu recaptcha-u';
      }
      else if(user['request']== 'username user'){
        this.message='Vec ste registrovani korisnik sa tim korisnickim imenom';
      }
      else if(user['request']== 'mail user'){
        this.message='Vec ste registrovani korisnik sa tim mejlom';
      }
      else if(user['request']== 'mail req'){
        this.message='Vec postoji zahtev za registraciju sa tim mejlom';
      }
      else if(user['request']== 'username req'){
        this.message='Vec postoji zahtev za registraciju sa tim korisnickim imenom';
      }

    })

  }
  else return false;
  }

  checkPass() {
    if (this.secpassword == this.user.password) {
      return true;
    }
    else {
      return false;
    }
  }

  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;
  }

  handleFileInput(files: FileList) {
      this.user.picture = files.item(0);
  }


}
