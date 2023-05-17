import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginManagerService } from './login-manager.service';
import { EpHttpServiceService } from './ep-http-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';


@Injectable({
  providedIn: 'root'
})
export class EnglishConfigurationService {
  numOfWordsInDictation = 5;
  highLevelWords = 30;
  mediumeLevelWords = 20;
  lowLevelWords = 10;
  showClueUntilLevel = 10;
  listener: Array<ConfigChanged> = [];

  constructor(private http: HttpClient, 
              private loginService: LoginManagerService, 
              private epService: EpHttpServiceService,
              private deviceDetectorService: DeviceDetectorService) {
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

  public getShowClueUntilLevel(): number{
    return this.showClueUntilLevel;
  }

  public refresh(){
    this.http.get(this.epService.getServerUrl() + "/english/config/get/" + this.loginService.getUser()).subscribe(request =>{
      this.numOfWordsInDictation = (request as any).numOfWordsInDictation;
      this.highLevelWords = (request as any).highLevelWords;
      this.mediumeLevelWords = (request as any).mediumLevelWords;
      this.lowLevelWords = (request as any).lowLevelWords;
      this.showClueUntilLevel = (request as any).showClueUntilLevel;

      for(let i=0; i<this.listener.length; i++){
        this.listener[i].configChangedAction();
      }
    }); 
  }

  public addConfigChangedListener(obj: ConfigChanged){
    this.listener.push(obj);
  }


  public getDevice(): string{
    const isMobile = this.deviceDetectorService.isMobile();
    const isTablet = this.deviceDetectorService.isTablet();
    const isDesktop = this.deviceDetectorService.isDesktop();

    if (isMobile) {
        return"mobile";
    } else if (isTablet) {
        return "desktop";
    } else if (isDesktop) {
        return "desktop";
    }

    return "desktop";
  }

  public getClassName(className: string){
    const device = this.getDevice();
    return device + '_' + className;
  }

}


export interface ConfigChanged{
  configChangedAction(): void;
}