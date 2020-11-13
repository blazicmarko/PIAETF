import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url='http://localhost:4000';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.url}/admin/getUsers`);
  }

  getRequests(){
    return this.http.get(`${this.url}/admin/getRequests`);
  }

  denyRequest(username:string){
    const data ={
      username:username
    }
    return this.http.post(`${this.url}/admin/denyRequest`,data);
  }

  approveRequest(username:string){
    const data ={
      username:username
    }
    return this.http.post(`${this.url}/admin/approveRequest`,data);
  }

  insertNew(user : User){
    const data ={
      user:user
    }
    return this.http.post(`${this.url}/admin/insertNew`,data);
  }

  deleteIt(username:string){
    const data ={
      username:username
    }
    return this.http.post(`${this.url}/admin/deleteIt`,data);
  }

  updateIt(user:User){
    const data ={
      user:user
    }
    return this.http.post(`${this.url}/admin/updateIt`,data);
  }

  insertNewGenre(genre:string){
    const data={
      genre:genre
    }
    return this.http.post(`${this.url}/admin/insertNewGenre`,data);
  }

  deleteGenre(genre:string){
    const data={
      genre:genre
    }
    return this.http.post(`${this.url}/admin/deleteGenre`,data);
  }
}
