import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login : any;

  constructor( private auth : AuthServiceService) { }

  ngOnInit(): void {
    console.log(this.login)
    if(localStorage.key(0)){
      this.login = true;
    }else{
      this.login = false
    }
  }

  logOut(){
    this.auth.logout();
  }
}
