import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginManagerService } from '../services/login-manager.service';
import { DictionaryManagerComponent } from './dictionary-manager/dictionary-manager.component';
import { ConfigChanged, EnglishConfigurationService } from '../services/english-configuration.service';

@Component({
  selector: 'myorg-english-practice-menu',
  templateUrl: './english-practice-menu.component.html',
  styleUrls: ['./english-practice-menu.component.scss'],
})
export class EnglishPracticeMenuComponent implements OnInit {
  @ViewChild(DictionaryManagerComponent) dictionaryManager?: DictionaryManagerComponent;
  device = "desktop";
  
  
  constructor(private loginService: LoginManagerService, private configurationService: EnglishConfigurationService) {}


  ngOnInit(): void {
    this.device = this.configurationService.getDevice();
  }

  myTabSelectedIndexChange(index: number) {
    if(index === 1){
      this.dictionaryManager?.ngOnInit();
    }else if(index === 3){
      this.configurationService.refresh();
    }
  } 


  getClassName(className: string){
    return this.device + '_' + className;
  }
}


export { ConfigChanged };

