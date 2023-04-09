import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginManagerService } from '../services/login-manager.service';
import { DictionaryManagerComponent } from './dictionary-manager/dictionary-manager.component';

@Component({
  selector: 'myorg-english-practice-menu',
  templateUrl: './english-practice-menu.component.html',
  styleUrls: ['./english-practice-menu.component.scss'],
})
export class EnglishPracticeMenuComponent implements OnInit {
  @ViewChild(DictionaryManagerComponent) dictionaryManager?: DictionaryManagerComponent;
  
  
  constructor(private loginService: LoginManagerService) {}


  ngOnInit(): void {}

  myTabSelectedIndexChange(index: number) {
    if(index === 1){
      this.dictionaryManager?.ngOnInit();
    }
  } 
}
