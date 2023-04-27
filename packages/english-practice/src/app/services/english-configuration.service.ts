import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginManagerService } from './login-manager.service';
import { EpHttpServiceService } from './ep-http-service.service';

@Injectable({
  providedIn: 'root'
})
export class EnglishConfigurationService {
  numOfWordsInDictation = 5;
  highLevelWords = 30;
  mediumeLevelWords = 20;
  lowLevelWords = 10;
  listener: Array<ConfigChanged> = [];

  constructor(private http: HttpClient, private loginService: LoginManagerService, private epService: EpHttpServiceService) {
    this.refresh();
   }

  public getNumOfWordsInDictation(): number{
    return this.numOfWordsInDictation;
  }

  public getHighLevelWords(): number{
    return this.highLevelWords;
  }

  public getMediumeLevelWords(): number{
    return this.mediumeLevelWords;
  }

  public getLowLevelWords(): number{
    return this.lowLevelWords;
  }

  public refresh(){
    this.http.get(this.epService.getServerUrl() + "/english/config/get/" + this.loginService.getUser()).subscribe(request =>{
      this.numOfWordsInDictation = (request as any).numOfWordsInDictation;
      this.highLevelWords = (request as any).highLevelWords;
      this.mediumeLevelWords = (request as any).mediumLevelWords;
      this.lowLevelWords = (request as any).lowLevelWords;

      for(let i=0; i<this.listener.length; i++){
        this.listener[i].configChangedAction();
      }
    }); 
  }

  public addConfigChangedListener(obj: ConfigChanged){
    this.listener.push(obj);
  }

}


export interface ConfigChanged{
  configChangedAction(): void;
}