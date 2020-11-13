import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  currentPage : string;


  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.currentPage = window.location.pathname;
    });

  }
  logout(){
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("username");
    this.router.navigateByUrl("/");
  }
}
