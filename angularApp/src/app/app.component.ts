import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'kasaangularApp';
  // tokenForSignout: any = localStorage.getItem('token');
  constructor(private router: Router) {}

  // signout() {
  //   localStorage.setItem('token', '');
  //   this.router.navigate(['/']);
  // }
}
