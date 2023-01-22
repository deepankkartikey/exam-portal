import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

type User = {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  authorities: [];
  enabled: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  
  user: User | undefined;
  constructor(private login: LoginService) { }

  ngOnInit(): void {
    // called as soon as component is loaded to initialize
    this.user = this.login.getUser();
  }

}
