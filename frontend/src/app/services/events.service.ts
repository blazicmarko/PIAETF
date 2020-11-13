import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  url='http://localhost:4000';

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get(`${this.url}/event/guest/getEvents`);
  }
}
