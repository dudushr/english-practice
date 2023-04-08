import { Component, OnInit } from '@angular/core';
import { LoginManagerService } from '../services/login-manager.service';

@Component({
  selector: 'myorg-english-practice-menu',
  templateUrl: './english-practice-menu.component.html',
  styleUrls: ['./english-practice-menu.component.scss'],
})
export class EnglishPracticeMenuComponent implements OnInit {
  constructor(private loginService: LoginManagerService) {}

  ngOnInit(): void {}

  
}
