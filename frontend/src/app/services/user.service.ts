import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri='http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(username, password){
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/login`, data);
  }

  register(user,recaptcha){
    console.log(user);
    const data = new FormData()
    data.append('name',user.name);
    data.append('surname',user.surname);
    data.append('username',user.username);
    data.append('password',user.password);
    data.append('date',user.date);
    data.append('city',user.city);
    data.append('state',user.state);
    data.append('mail',user.mail);
    data.append('type',user.type);
    if(user.picture){
      data.append('myImage',user.picture,user.username);
      data.append('havePic','yes');
    }
    else{
      data.append('havePic','no');
    }
    data.append('recaptcha',recaptcha);

    return this.http.post(`${this.uri}/register`, data);
  }

  getUser(username){
    const data = {
      username:username
    };
    return this.http.post(`${this.uri}/getUser`, data);
  }
  getUserByEmail(email){
    const data = {
      email:email
    };
    return this.http.post(`${this.uri}/getUserByEmail`, data);
  }

  changeUser(user){
    const data = {
      user:user
    };
    return this.http.post(`${this.uri}/changeUser`, data);
  }

  getComments(username){
    const data = {
      username:username
    };
    return this.http.post(`${this.uri}/getComments`, data);
  }

  forgotPass(email){
    const data = {
      email:email
    };
    return this.http.post(`${this.uri}/forgotPass`, data);
  }
}
