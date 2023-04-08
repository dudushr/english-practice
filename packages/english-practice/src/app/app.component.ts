import { Component } from '@angular/core';
import { LoginManagerService } from './services/login-manager.service';

@Component({
  selector: 'myorg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'english-practice';
  loginUser = "";

  constructor(private loginService: LoginManagerService){
    this.loginService.setRoot(this);
  }

  public updateLoginUser(loginUser: string){
    this.loginUser = loginUser;
  }
}
