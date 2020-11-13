import { Component, NgModule, OnInit } from '@angular/core';
import { Books } from '../models/books.model';
import { Comments } from '../models/comments.model';
import { User } from '../models/user.model';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})

export class BookComponent implements OnInit, MatProgressBarModule {

  booklover : User;
  upadatedUser : User;
  user : string;
  username : string;
  book : Books;
  name : string;
  comments : Array<Comments>;
  message : string;
  oldGrade : number;
  isReading : boolean;

  numOfPages : number;
  numOfPagesRed : number;

  rating : number;
  commentText : string;
  newComment : Comments;
  changeComment : boolean;
  commentEmpty : boolean;
  picName: any;


  constructor (private bookService : BookService , private userService : UserService, private router: Router) { }

  ngOnInit(): void {
    this.commentEmpty = false;
    this.changeComment = false;
    this.numOfPages=100;
    this.numOfPagesRed=0;
    this.book = new Books();
    this.user = sessionStorage.getItem("user");
    this.name =sessionStorage.getItem("knjiga");
    this.username =sessionStorage.getItem("username");
    this.bookService.getBook(this.name).subscribe((book) => {
      this.book =book[0];
      this.picName=this.book.picture;
      console.log(this.picName);
    });
    this.bookService.getComments(this.name).subscribe((comments) => {
      this.comments =<Array<Comments>>comments;
      if (this.comments.length == 0){
        this.commentEmpty = true;
      }

    });
    this.userService.getUser(this.username).subscribe((user) => {
      this.booklover =<User>user[0];
      var i;
      for(i = 0; i<this.booklover.readingBook.length ; i++){
        if(this.booklover.readingBook[i].name == this.book.name)
          this.isReading = true;
      }
  });

  }

  insertIntoRead(){
    this.userService.getUser(this.username).subscribe((user) => {
      this.booklover =<User>user[0];

    this.upadatedUser = this.booklover;
    this.upadatedUser.readBook.push(this.book);
    this.userService.changeUser(this.upadatedUser).subscribe(respond => {
      if (respond['respond'] == 'ok') this.message = "Ubacena knjiga u procitane";
      else this.message = "Greska";
    })
  });
  }
  insertIntoWannaRead(){
    this.userService.getUser(this.username).subscribe((user) => {
      this.booklover =<User>user[0];

    this.upadatedUser = this.booklover;
    this.upadatedUser.wannaReadBook.push(this.book);
    this.userService.changeUser(this.upadatedUser).subscribe(respond => {
      if (respond['respond'] == 'ok') this.message = "Ubacena knjiga u listu zelja";
      else this.message = "Greska";
    })
  });
  }
  dropFromWannaRead(){
    this.userService.getUser(this.username).subscribe((user) => {
      this.booklover =<User>user[0];

    this.upadatedUser = this.booklover;
    var i;
    for(i = 0; i<this.upadatedUser.wannaReadBook.length ; i++){
      if(this.upadatedUser.wannaReadBook[i].name == this.book.name)
        break;
    }
    for(let j = i ; j<this.upadatedUser.wannaReadBook.length-1 ; j++){
      this.upadatedUser.wannaReadBook[j]= this.upadatedUser.wannaReadBook[j+1];
    }
    this.upadatedUser.wannaReadBook.pop();
    this.userService.changeUser(this.upadatedUser).subscribe(respond => {
      if (respond['respond'] == 'ok') this.message = "Izbacena knjiga iz liste zelja";
      else this.message = "Greska";
    })
  });
  }
  insertIntoReading(){
    this.userService.getUser(this.username).subscribe((user) => {
      this.booklover =<User>user[0];

    this.upadatedUser = this.booklover;
    this.upadatedUser.readingBook.push(this.book);
    this.userService.changeUser(this.upadatedUser).subscribe(respond => {
      if (respond['respond'] == 'ok') {this.message = "Ubacena knjiga one koje se trenutno citaju";
    this.isReading=true;}
      else this.message = "Greska";
    })
  });

  }

  colorStars(num : number){
    for(let i = 1 ; i <= num ; i++){
      document.getElementById(i.toString()).classList.add('checked');
    }
  }

  uncolorStars(){
    for(let i = 1 ; i <= 10 ; i++){
      document.getElementById(i.toString()).classList.remove('checked');
    }
  }

  rate(num : number){
    this.rating = num;
    console.log(this.rating);
  }

  leaveComment(){
      this.newComment = new Comments();
      console.log(this.newComment);
      this.newComment.book = this.name;
      this.newComment.author=this.username;
      this.newComment.description=this.commentText;
      this.newComment.grade=this.rating;

      this.bookService.leaveComment(this.newComment).subscribe(respond => {
        if (respond['respond'] == 'ok') {
          this.bookService.getBook(this.name).subscribe((book) => {
            this.book =book[0];
            this.book.grade = (this.book.grade*this.book.numOfComm + this.rating)/(this.book.numOfComm+1);
            this.book.numOfComm++;
            this.bookService.cngBook(this.book).subscribe(respond => {});
          });
          this.message = "Komentar uspesno postavljen";}
        else if(respond['respond'] == 'author') this.message = "Vec ste ostavili komentar";
        else this.message = "Greska";
        console.log(this.message);
      })
      var i;
    for(i = 0 ; i < this.comments.length; i++){
      if((this.comments[i].author == this.newComment.author) && (this.comments[i].book == this.newComment.book)){
        break;
      }
    }
    this.comments[i]=this.newComment;
    this.isReading = false;

    //Za obavestenja dovuces iz sebe sve username koji te prate, onda za svaki getUser, procitas mejl i sibnes obavestenje
  }

  cngComment(){
    this.newComment = new Comments();
      console.log(this.newComment);
      this.newComment.book = this.name;
      this.newComment.author=this.username;
      this.newComment.description=this.commentText;
      this.newComment.grade=this.rating;
      for(let i = 0 ; i < this.comments.length ; i++){
        if(this.comments[i].author==this.username){
          this.oldGrade = this.comments[i].grade;
        }
      }
      this.bookService.cngComment(this.newComment).subscribe(respond => {
        if (respond['respond'] == 'ok') {
          this.bookService.getBook(this.name).subscribe((book) => {
            this.book =book[0];
            let newGrade =(this.book.grade*this.book.numOfComm + this.rating - this.oldGrade)/(this.book.numOfComm);
            this.book.grade = newGrade;
            this.bookService.cngBook(this.book).subscribe(respond => {});
          });
          this.message = "Komentar uspesno promenjen";}
        else this.message = "Greska";
        console.log(this.message);
      })
      var i;
    for(i = 0 ; i < this.comments.length; i++){
      if((this.comments[i].author == this.newComment.author) && (this.comments[i].book == this.newComment.book)){
        break;
      }
    }
    this.comments[i]=this.newComment;
    this.changeComment = false;
  }

  navigateToProfile(profile: string){
    sessionStorage.setItem("profile",profile);
    this.router.navigateByUrl("/userView");

  }
}
