import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  resolved(captchaResponse: string, res) {
    console.log(`Resolved response token: ${captchaResponse}`);

  }
}
