import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  url='http://localhost:4000';

  constructor(private http: HttpClient) { }

  getGenres(){
    return this.http.get(`${this.url}/genre/getGenres`);
  }
}
