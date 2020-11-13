import { Books } from './books.model';

export class User{
  name: string;
  surname: string;
  username: string;
  password: string;
  date: Date;
  city: string;
  state: string;
  mail: string;
  type: string;
  readBook: Array<Books>;
  readingBook : Array<Books>;
  wannaReadBook : Array<Books>;
  follows : Array<string>;
  followers : Array<string>;
  picture : any;


  constructor() {
    this.date = new Date();
    this.readBook = new Array<Books>();
    this.readingBook = new Array<Books>();
    this.wannaReadBook = new Array<Books>();
    this.follows = new Array<string>();
    this.followers = new Array<string>();
  }
  }
