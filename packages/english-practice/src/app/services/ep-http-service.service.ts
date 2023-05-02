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
    const port = environment.serverPort;

    if(currentUrl.indexOf("localhost") != -1){
      return "http://localhost:" + port;
    }else{
      return "http://141.136.36.155:" + port;
    }

  }
}
