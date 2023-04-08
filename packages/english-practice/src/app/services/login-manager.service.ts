import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { DictionaryManagerComponent } from '../english-practice-menu/dictionary-manager/dictionary-manager.component';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {
  loginUser = "";
  root: AppComponent | undefined;
  dictionaryManager: DictionaryManagerComponent | undefined;

  constructor() { }

  public getUser(): string{
    return this.loginUser;
  }

  public setUser(user: string): void{
    this.loginUser = user;
    this.updateUser();
    this.dictionaryManager?.ngOnInit();
  }

  public setRoot( root: AppComponent){
    this.root = root;
  }

  public updateUser(){
    this.root?.updateLoginUser(this.loginUser);
  }

  public setDictionaryManager(dictionaryManager: DictionaryManagerComponent){
    this.dictionaryManager = dictionaryManager;
  }
}
