
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from '../models/books.model';
import { Genre } from '../models/genre.model';
import { User } from '../models/user.model';
import { BookService } from '../services/book.service';
import { GenreService } from '../services/genre.service';
import { UserService } from '../services/user.service';
import { Chart } from '../models/chart.model';
import * as CanvasJS from './canvasjs.min.js';
import { Comments } from '../models/comments.model';
import {CdkStepper} from '@angular/cdk/stepper';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  constructor(private genreService: GenreService,private router: Router,private userService: UserService, private bookService: BookService) { }

  izmeniPodatke : boolean;
  user : User;
  changedUser: User;
  username : string;
  message : string;
  genre : Genre;
  books: Array<Books>;
  chartArray :Array<Chart>;
  comments : Comments;
  genres :Array<Genre>;

  name : string;
  surname : string;
  date : Date;
  city : string;
  state : string;
  mail : string;

  book : Books;

  searchName :string;
  searchSurname :string;
  searchUsername :string;
  searchEmail :string;

  booksView : Array<Books>;
  filterName: string;
  filterAuthor: string;
  filterGenre : string;


  newBook : boolean;
  newBookName :string;
  newBookAuthors :string;
  newBookArrayAuthors: string[];
  newBookGenres :string[];
  newBookDate : Date;
  newBookDesc :string;
  newBookPic : File;
  insertedBook : Books;
  userType : string;



  ngOnInit(): void {
    this.userType = sessionStorage.getItem("user");
    this.newBook = false;
    this.izmeniPodatke = false;
    this.user= new User();
    this.username = sessionStorage.getItem("username");
    this.userService.getUser(this.username).subscribe(user => {
      this.user = user[0];
      console.log(this.user.picture);

    })
    this.book = new Books();
    this.genreService.getGenres().subscribe(genre => {
      this.genre = <Genre>genre;
    })
    this.userService.getComments(this.username).subscribe(com => {
      this.comments = <Comments>com;
    })
    this.books = new Array();
    this.booksView = new Array();
    this.bookService.getBooks().subscribe((books) => {
      console.log(books);
      this.books = <Array<Books>>books;
      this.booksView =<Array<Books>>books;
    });
    this.genres = new Array();
    this.genreService.getGenres().subscribe((genres) => {
      console.log(genres);
      this.genres = <Array<Genre>>genres;
    });
    this.makeChart();

  }

  changeUser(){
    this.changedUser = new User();
    this.changedUser = this.user;
    if(this.name){
      this.changedUser.name = this.name;
    }
    if(this.surname){
      this.changedUser.surname = this.surname;
    }
    if(this.date){
      this.changedUser.date = this.date;
    }
    if(this.city){
      this.changedUser.city = this.city;
    }
    if(this.state){
      this.changedUser.state = this.state;
    }
    if(this.mail){
      this.changedUser.mail = this.mail;
    }
    this.userService.changeUser(this.changedUser).subscribe(respond => {
      if (respond['respond'] == 'ok') this.message = "Promenjeni podaci";
      else this.message = "Greska";
    })
    this.user = this.changedUser;
    this.izmeniPodatke = false;
  }

  deleteReadingBook(name :string){
    var i =0;
    for( i = 0 ; i < this.user.readingBook.length ; i++){
      if(this.user.readingBook[i].name==name){
        break
      }
    }
    for(let j=i ; j< this.user.readingBook.length-1; j++){
      this.user.readingBook[j]=this.user.readingBook[j+1];
    }
    this.user.readingBook.pop();
    this.changeUser();
  }

  navigateToBook (name : string){

    sessionStorage.setItem("knjiga", name);
    this.router.navigateByUrl("/book");
  }

  makeChart(){ this.userService.getUser(this.username).subscribe(user => {
    this.user = user[0];
    let haveAlready = false;
    this.chartArray = new Array<Chart>();
    console.log(this.chartArray);
    for(let i = 0 ; i <this.user.readBook.length; i++){
      for(let j = 0 ; j<this.user.readBook[i].genres.length; j++){
        for(let k = 0 ; k<this.chartArray.length ; k++){
          if(this.chartArray[k].name == this.user.readBook[i].genres[j]){
            this.chartArray[k].y++;
            haveAlready = true;
          }
        }
        if(haveAlready == false){
          let temp = new Chart();
          temp.name = this.user.readBook[i].genres[j];
          temp.y = 1;
          this.chartArray.push(temp);
        }
      }
      haveAlready = false;
    }


    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Žanrovi",
        fontColor: "#9F6426",
        fontFamily: "Raleway, sans-serif",
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: this.chartArray
      }]
    });

    chart.render();
  })

  }

  search(){
    this.userService.getUser(this.searchUsername).subscribe(user => {
      this.user = user[0];
      sessionStorage.setItem('profile',this.user.username);
      this.router.navigateByUrl("/userView");
    })
    this.message = "Nije pronađen profil sa tim imenom";
  }

  filters() {
    var flagBook = false;
    var filterBooks = new Array<Books>();
    if(this.filterName == undefined){
      this.filterName = "";
    }
    if(this.filterAuthor == undefined){
      this.filterAuthor = "";
    }
    if(this.filterGenre == undefined || this.filterGenre == "svi"){
      this.filterGenre = "";
    }
    for(let i = 0; i< this.books.length; i++){
      for(let j = 0; j<this.books[i].authors.length; j++){
        for(let k = 0; k<this.books[i].genres.length; k++){
          if(this.books[i].name
            .toLocaleLowerCase()
            .includes(this.filterName.toLocaleLowerCase()) &&
            this.books[i].authors[j]
                .toLocaleLowerCase()
                .includes(this.filterAuthor.toLocaleLowerCase()) &&
                this.books[i].genres[k]
                .toLocaleLowerCase()
                .includes(this.filterGenre.toLocaleLowerCase())
                ){
                  flagBook= true;
                  break;
                }
        }
        if(flagBook == true){
          filterBooks.push(this.books[i]);
          flagBook = false;
          break;
        }

      }
    }
    if(filterBooks){
      this.booksView = filterBooks;
      this.newBook = false;
    }

    if(filterBooks.length == 0){
      this.newBook = true;
    }
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
    if(sessionStorage.getItem("user")=="user"){
      this.insertedBook.approved=false;
    }
    else{
      this.insertedBook.approved=true;
    }
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

}
