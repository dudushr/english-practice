import { Injectable } from '@angular/core';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class EpHttpServiceService {

  constructor(private location: Location) { }

  public getServerUrl(): string{
    const currentUrl = window.location.href;
   if(currentUrl.indexOf("localhost") != -1){
    return "http://localhost:8080";
   }else{
    return "http://141.136.36.155:8080";
   }

  }
}
