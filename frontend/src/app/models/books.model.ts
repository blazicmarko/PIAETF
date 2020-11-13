import { Comments } from './comments.model';

export class Books{
  picture: File;
  name: string;
  authors : Array<string>;
  date : Date;
  genres : Array<string>
  description : string;
  grade : number;
  numOfComm : number;
  approved : boolean;

  constructor() {
    this.date = new Date();
  }
  }
