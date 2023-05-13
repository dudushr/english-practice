import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpHttpServiceService {

  constructor(private location: Location) { }

  public getServerUrl(): string{
    const currentUrl = window.location.href;
    const port = this.getPort();

    if(currentUrl.indexOf("localhost") != -1){
      return "http://localhost:" + port;
    }else{
      return "http://141.136.36.155:" + port;
    }

  }

  getPort(): number{
    const currentUrl = window.location.href;
    if(currentUrl.indexOf("4210") != -1){
      return 8083;
    }else{
      return 8080;
    }
  }
}
