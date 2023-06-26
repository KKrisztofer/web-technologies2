import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private LoginComponent: LoginComponent,
  ) { } 

  title = 'Webshop';
  userloggedin = false;

  userLoggedIn(){
    this.userloggedin = true;
  }
  
}
