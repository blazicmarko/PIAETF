import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Books } from '../models/books.model';
import { Comments } from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  url='http://localhost:4000';

  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get(`${this.url}/book/getBooks`);
  }

  getBook(name:string){
    const data ={
      name:name
    }
    return this.http.post(`${this.url}/book/getBook`,data);
  }

  getComments(name: string) {
    const data ={
      name:name
    }
    return this.http.post(`${this.url}/book/getComments`,data);
  }

  leaveComment(comment : Comments){
    const data ={
      comment:comment,
    }
    return this.http.post(`${this.url}/book/leaveComment`,data);
  }

  cngComment(comment : Comments){
    const data ={
      comment:comment,
    }
    return this.http.post(`${this.url}/book/cngComment`,data);
  }

  insertBook(book){
    const data=new FormData()
    let bookName : string;
    bookName = book.name;
    bookName.replace("\\s+","");
    console.log(bookName);
    data.append('bookName',bookName)
    data.append('name',book.name);
    data.append('authors',book.authors);
    data.append('date',book.date);
    data.append('genres',book.genres);
    data.append('description',book.description);
    data.append('grade','0');
    data.append("numOfComm",'0')
    data.append('approved',book.approved);
    if(book.picture){
      data.append('myImage',book.picture,bookName.split(' ')[0]);
      data.append('havePic','yes');
    }
    else{
      data.append('havePic','no');
    }

    return this.http.post(`${this.url}/book/insertBook`,data);
  }

  cngBook(book : Books){
    const data= {
      book:book
    }
    return this.http.post(`${this.url}/book/cngBook`,data);
  }
}

