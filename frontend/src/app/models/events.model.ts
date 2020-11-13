export class Events{
  name: string;
  dateFrom : Date;
  dateTo : Date;
  description : string;
  type : string

  constructor() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
  }
  }
