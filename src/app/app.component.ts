import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample';
  currentUser:Object={};
  constructor(public authService:AuthService){
  }
  logout() {
    this.authService.doLogout();
  }
  
}
