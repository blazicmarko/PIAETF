import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../models/user.model';
import { AdminService } from 'src/app/services/admin.service';

import { Books } from '../models/books.model';
import { Genre } from '../models/genre.model';
import { GenreService } from '../services/genre.service';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  userViews: boolean;
  requestViews: boolean;
  addUserView: boolean;
  addNewBook: boolean;
  showBook: boolean;
  bookCng : boolean;
  changeGenre : boolean;

  users: any;
  requests: any;
  newUser: User;
  requestsEmpty = false;
  usersEmpty = false;
  state: string;
  newBook : Books;
  genres :Genre;
  booksView : Array<Books>;


  newBookName :string;
  newBookAuthors :string;
  newBookArrayAuthors: string[];
  newBookGenres :string[];
  newBookDate : Date;
  newBookDesc :string;
  newGenre: string;
  insertedBook : Books;
  newBookPic : File;

  message : String;


  constructor(private bookService: BookService,private genreService: GenreService,private router: Router,private adminService : AdminService, public app: AppComponent) { }

  ngOnInit(): void {
    this.bookCng = false;
    this.newUser = new User();
    this.newBook = new Books();
    this.booksView = new Array<Books>();
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
      if (this.users.length == 0) this.usersEmpty = true;
    })
    this.adminService.getRequests().subscribe(requests => {
      this.requests = requests;
      if (this.requests.length == 0) this.requestsEmpty = true;

    })
    this.genreService.getGenres().subscribe(genre => {
      this.genres = <Genre>genre;
    })

    this.bookService.getBooks().subscribe(books=>{
      this.booksView = <Array<Books>>books;
    })

  }

  showUsers() {
    this.ngOnInit();
    this.addUserView = false;
    this.requestViews = false;
    this.userViews = true;
    this.addNewBook = false;
    this.showBook = false;
    this.bookCng = false;
    this.changeGenre = false;
    this.message = "";
  }

  showRequests() {
    this.ngOnInit();
    this.addUserView = false;
    this.userViews = false;
    this.requestViews = true;
    this.addNewBook = false;
    this.showBook = false;
    this.bookCng = false;
    this.changeGenre = false;
    this.message = "";
  }

  showAddUser() {
    this.addUserView = true;
    this.userViews = false;
    this.requestViews = false;
    this.addNewBook = false;
    this.showBook = false;
    this.bookCng = false;
    this.changeGenre = false;
    this.message = "";
  }
  showChangeGenre(){
    this.ngOnInit();
    this.addNewBook = false;
    this.addUserView = false;
    this.userViews = false;
    this.requestViews = false;
    this.showBook = false;
    this.bookCng = false;
    this.changeGenre = true;
    this.message = "";
  }
  showAddBook(){
    this.ngOnInit();
    this.addNewBook = true;
    this.addUserView = false;
    this.userViews = false;
    this.requestViews = false;
    this.showBook = false;
    this.bookCng = false;
    this.changeGenre = false;
    this.message = "";
  }

  showBooks(){
    this.ngOnInit();
    this.addNewBook = false;
    this.addUserView = false;
    this.userViews = false;
    this.requestViews = false;
    this.showBook = true;
    this.bookCng = false;
    this.changeGenre = false;
    this.message = "";
  }

  denyRequest(username: string) {
    this.adminService.denyRequest(username).subscribe(respond => {
      if (respond['respond'] == 'ok') this.message = "odbijen zahtev";
      else this.message = "greska";
    });
    let i=0;
    while(i<this.requests.lenght){
      if(this.requests[i]== username){
        break;
      }
      else i++
    }
    let j = i;
    while(j<this.requests.lenght-1){
      this.requests[j]=this.requests[j+1];
      j++;
    }
    this.requests.pop();
    if (this.requests.length == 0) this.requestsEmpty = true;
    else this.requestsEmpty = false;
    this.showRequests();
  }
  approveRequest(username : string){
    this.adminService.approveRequest(username).subscribe(respond => {
      if (respond['respond'] == 'ok') this.message = "odobren zahtev";
      else this.message = "greska";
    });
    let i=0;
    while(i<this.requests.lenght){
      if(this.requests[i]== username){
        this.users.push(this.requests[i]);
        console.log(this.users);
        this.usersEmpty = false;
        break;
      }
      else i++
    }
    let j = i;
    while(j<this.requests.lenght-1){
      this.requests[j]=this.requests[j+1];
      j++;
    }
    this.requests.pop();
    if (this.requests.length == 0) this.requestsEmpty = true;
    else this.requestsEmpty = false;
    this.showRequests();
  }

  insertNew(){
    console.log(this.newUser);
    this.adminService.insertNew(this.newUser).subscribe(respond => {
      if (respond['respond'] == 'ok') {
        this.users.push(this.newUser);
        this.usersEmpty = false;
        this.message = "Korisnik uspesno dodat u sistem";
      }
      else {
        if (respond['respond'] == 'mail') this.message = "Previse naloga sa trazenim majlom";
        else {
          if (respond['respond'] == 'username') this.message = "Korisnicko ime je zauzeto";
        }
      }
  });
  }

  deleteIt(username: string){
    this.adminService.deleteIt(username).subscribe(respond => {
      if (respond['respond'] == 'ok') {
        this.message = "Korisnik uspesno izbrisan";
      }
    });
    let i = 0;
    while(i<this.users.lenght){
      if(this.users[i]== username){
        break;
      }
      else i++
    }
    let j = i;
    while(j<this.users.lenght-1){
      this.users[j]=this.users[j+1];
      j++;
    }
    this.users.pop();
    if (this.users.length == 0) this.usersEmpty = true;
    else this.usersEmpty = false;
    this.showUsers();
  }

  updateIt(user : User){
    this.adminService.updateIt(user).subscribe(respond => {
      if (respond['respond'] == 'ok') {
        this.message = "Korisnik uspesno azuriran";
        let i = 0;
        while(i<this.users.lenght){
          if (this.users[i].username == user.username) {
            this.users[i] = user;
            break;
          }
          else i++;
        }
  }
  });
}

  insertNewBook(){
    this.insertedBook = new Books();
    this.insertedBook.name = this.newBookName;
    this.insertedBook.genres = this.newBookGenres;
    this.insertedBook.description = this.newBookDesc;
    this.insertedBook.date = this.newBookDate;
    this.insertedBook.picture =this.newBookPic;
    this.newBookArrayAuthors = new Array();
    var i =0;
    var temp = this.newBookAuthors.split(", ")[i];
    while(temp){
      this.newBookArrayAuthors.push(temp);
      i++;
      temp = this.newBookAuthors.split(", ")[i]
    }
    this.insertedBook.authors = this.newBookArrayAuthors;
    this.insertedBook.approved = true;
    console.log(this.insertedBook);
    this.bookService.insertBook(this.insertedBook).subscribe(respond => {
      if (respond['respond'] == 'ok') this.message = "Ubacena knjiga";
      else this.message = "Greska";
    })
  }
  handleFileInput(files: FileList) {
    this.newBookPic = files.item(0);
  }
  aproveBook(book : Books){
    book.approved=true;
    this.bookService.cngBook(book).subscribe(book=>{
      if(book){
        console.log(book);
        var temp = <Books>book;
        var i;
        for(i = 0 ; i< this.booksView.length ; i++){
          if(this.booksView[i].name==temp.name){
            break;
          }
        }
        this.booksView[i]=temp;
      }
    })
  }

  cngBook(){
    this.insertedBook = new Books();
    this.insertedBook.name = this.newBookName;
    this.insertedBook.genres = this.newBookGenres;
    this.insertedBook.description = this.newBookDesc;
    this.insertedBook.date = this.newBookDate;
    this.newBookArrayAuthors = new Array();
    var i =0;
    var temp = this.newBookAuthors.split(", ")[i];
    while(temp){
      this.newBookArrayAuthors.push(temp);
      i++;
      temp = this.newBookAuthors.split(", ")[i]
    }
    this.insertedBook.authors = this.newBookArrayAuthors;
    if(sessionStorage.getItem("user")=="user"){
      this.insertedBook.approved=false;
    }
    else{
      this.insertedBook.approved=true;
    }
    console.log(this.insertedBook);
    this.bookCng = false;
    this.bookService.cngBook(this.insertedBook).subscribe(book=>{
      if(book){
        console.log(book);
        var temp = <Books>book;
        var i;
        for(i = 0 ; i< this.booksView.length ; i++){
          if(this.booksView[i].name==temp.name){
            break;
          }
        }
        this.booksView[i]=temp;
      }
    })
  }

  insertNewGenre(){
    this.adminService.insertNewGenre(this.newGenre).subscribe(respond => {
      if (respond['respond'] == 'ok') {
        this.message = "Uspesno unet novi žanr";
      }
      else
      this.message = "Greška!";
  });
  }

  deleteGenre(genre){
    console.log(genre);
    this.adminService.deleteGenre(genre.name).subscribe(respond => {
      if (respond['respond'] == 'ok') {
        this.message = "Uspesno izbrisan žanr";
      }
      else
      this.message = "Greška!";
  });
  }
}
