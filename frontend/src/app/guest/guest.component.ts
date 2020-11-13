import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Books } from '../models/books.model';
import { Events } from '../models/events.model';
import { Genre } from '../models/genre.model';
import { EventsService } from '../services/events.service';
import { AppComponent } from '../app.component';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
})
export class GuestComponent implements OnInit {
  eventsEmpty: boolean;
  booksEmpty: boolean;
  books: Array<Books>;
  events: Array<Events>;
  genres: Array<Genre>;
  booksView: Array<Books>;

  actualDate :Date;
  name: string;
  author: string;
  genre: string;

  constructor(
    private router: Router,
    public app: AppComponent,
    private bookSerivce: BookService,
    private eventService: EventsService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.actualDate = new Date();
    console.log(this.actualDate)
    this.books = new Array();
    this.booksView = new Array();
    this.bookSerivce.getBooks().subscribe((books) => {
      console.log(books);
      this.books = <Array<Books>>books;
      this.booksView = <Array<Books>>books;
      if (this.books.length == 0) this.booksEmpty = true;
    });
    this.events = new Array();
    this.eventService.getEvents().subscribe((events) => {
      console.log(events);
      this.events = <Array<Events>>events;
      for(let i = 0 ; i <this.events.length ; i ++){
        this.events[i].dateFrom = new Date(this.events[i].dateFrom );
        this.events[i].dateTo = new Date(this.events[i].dateTo );
      }
      if (this.events.length == 0) this.eventsEmpty = true;
    });
    this.genres = new Array();
    this.genreService.getGenres().subscribe((genres) => {
      console.log(genres);
      this.genres = <Array<Genre>>genres;
    });
  }


  filters() {
    var flagBook = false;
    var filterBooks = new Array<Books>();
    if(this.name == undefined){
      this.name = "";
    }
    if(this.author == undefined){
      this.author = "";
    }
    if(this.genre == undefined || this.genre == "svi"){
      this.genre = "";
    }
    for(let i = 0; i< this.books.length; i++){
      for(let j = 0; j<this.books[i].authors.length; j++){
        for(let k = 0; k<this.books[i].genres.length; k++){
          if(this.books[i].name
            .toLocaleLowerCase()
            .includes(this.name.toLocaleLowerCase()) &&
            this.books[i].authors[j]
                .toLocaleLowerCase()
                .includes(this.author.toLocaleLowerCase()) &&
                this.books[i].genres[k]
                .toLocaleLowerCase()
                .includes(this.genre.toLocaleLowerCase())
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
    if(filterBooks)
    this.booksView = filterBooks;
    console.log(filterBooks);

  }

  navigateToBook (name : string){
    sessionStorage.setItem("user", "guest");
    sessionStorage.setItem("knjiga", name);
    this.router.navigateByUrl("/book");
  }
}
