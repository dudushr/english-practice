import { Component, OnInit } from '@angular/core';
import { EnglishConfigurationService } from '../../services/english-configuration.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginManagerService } from '../../services/login-manager.service';
import { ConfigChanged } from '../english-practice-menu.component';

@Component({
  selector: 'myorg-english-practice-configuration',
  templateUrl: './english-practice-configuration.component.html',
  styleUrls: ['./english-practice-configuration.component.scss'],
})
export class EnglishPracticeConfigurationComponent implements OnInit, ConfigChanged {
  numOfWordsInDictation = "";
  highLevelWords = "";
  mediumLevelWords = "";
  lowLevelWords = "";

  constructor(private http: HttpClient, private loginService: LoginManagerService, private configurationService: EnglishConfigurationService) {    
    this.configurationService.addConfigChangedListener(this);
    this.configurationService.refresh;
  }

  ngOnInit(): void {
    console.log(111);
  }


  saveConfig(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const httpParams = new HttpParams()
    .append("numOfWordsInDictation", JSON.stringify(this.numOfWordsInDictation))
    .append("highLevelWords", JSON.stringify(this.highLevelWords))
    .append("mediumLevelWords", JSON.stringify(this.mediumLevelWords))
    .append("lowLevelWords", JSON.stringify(this.lowLevelWords))
    .append("uid", this.loginService.getUser());

    this.http.post("http://localhost:8080/english/config/save", httpParams, httpOptions).subscribe(request =>{
      console.log("Updated");
    });   
  }
  
  configChangedAction(){
    this.numOfWordsInDictation = "" + this.configurationService.getNumOfWordsInDictation();
    this.highLevelWords = "" + this.configurationService.getHighLevelWords();
    this.mediumLevelWords = "" + this.configurationService.getMediumeLevelWords();
    this.lowLevelWords = "" + this.configurationService.getLowLevelWords();
  }
}
