import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginManagerService } from '../services/login-manager.service';

@Component({
  selector: 'myorg-login-english-practice',
  templateUrl: './login-english-practice.component.html',
  styleUrls: ['./login-english-practice.component.scss'],
})
export class LoginEnglishPracticeComponent implements OnInit {
  usersFormControl = new FormControl('');
  usersList: string[] = ['Elad', 'Dudu'];

  constructor(private loginService: LoginManagerService) {}

  ngOnInit(): void {}

  userSelected($event: any){
    this.loginService.setUser($event.value);
  }
}
