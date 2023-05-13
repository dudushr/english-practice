import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EnglishWordComponent } from '../../../dictionary/english-word/english-word.component';
import { LoginManagerService } from '../../../services/login-manager.service';
import { EpHttpServiceService } from '../../../services/ep-http-service.service';
import { FileUploader } from 'ng2-file-upload';
import { catchError, throwError } from 'rxjs';




@Component({
  selector: 'myorg-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.scss'],
})
export class WordEditorComponent implements OnInit {
  word: EnglishWordComponent = new EnglishWordComponent();
  uploader: FileUploader = new FileUploader({url: 'http://localhost:8080/upload'});


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<WordEditorComponent>, private http: HttpClient, private loginService: LoginManagerService, private epService: EpHttpServiceService) {
    const uid = this.loginService.getUser();
    this.http.get(this.epService.getServerUrl() + "/dictionary/" + uid + "/getWord/" + data.word).subscribe(request =>{
      const wordFromServer = (request as any);
      this.word = new EnglishWordComponent();
      this.word.englishWord = wordFromServer.englishWord;
      this.word.hebrewWord = wordFromServer.hebrewWord;
      this.word.level = wordFromServer.level;
      this.word.lastDictationDate = wordFromServer.lastDictationDate;
      this.word.clueFileName = wordFromServer.clueFileName;

      if(this.word.level === undefined){
        this.word.level = 0;
      }

      if(this.word.clueFileName === undefined){
        this.word.clueFileName = "";
      }

      this.uploader = new FileUploader({url: 'http://localhost:8080/upload/' + uid + '/' + this.word.englishWord});
      this.uploader.onAfterAddingFile = (file) => {
        console.log('File selected:', file);
        this.uploader.uploadAll();        
      }; 
      this.uploader.onCompleteAll = () => {
        this.reloadClueFileName();
      };
      
    });

  }

  ngOnInit(): void {
    
  }

  addNewHebrewWord() {
    if(this.word.getLastHebrewWord() != ""){
      this.word.addHebrewWord("");
    }
  }


  getWordClueFileName(): string{
    let clueFileName = this.word.clueFileName;
    if(clueFileName.indexOf("\\") != -1){
      clueFileName = clueFileName.substring(clueFileName.lastIndexOf("\\") + 1);
    }else  if(clueFileName.indexOf("/") != -1){
      clueFileName = clueFileName.substring(clueFileName.lastIndexOf("/") + 1);
    }
    return clueFileName;
  }

  removeWord(index: number){
    this.word.removeHebrewWord(index);
  }

  updateHebrewWord(index: number, hebrewTwxt: string){
    this.word.hebrewWord[index] = hebrewTwxt;
  }

  updateLevel($event: any){
    this.word.level = $event.srcElement.value;
  }

  saveWord(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const httpParams = new HttpParams()
    .append("wordToSave", JSON.stringify(this.word))
    .append("uid", this.loginService.getUser());

    
    this.http.post(this.epService.getServerUrl() + "/dictionary/update", httpParams, httpOptions).subscribe(request =>{
      this.dialogRef.close();
    });
  }


  removeClue(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const httpParams = new HttpParams()
    .append("wordToRemove", this.word.englishWord)
    .append("uid", this.loginService.getUser());

    
    this.http.post(this.epService.getServerUrl() + "/remove/clue/" + this.loginService.getUser() + "/" + this.word.englishWord, httpParams, httpOptions)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError('An error occurred');
      }))
    .subscribe(request =>{
      console.log("removed");
      this.reloadClueFileName();
    });
  }

  reloadClueFileName(){
    const uid = this.loginService.getUser();
    this.http.get(this.epService.getServerUrl() + "/dictionary/" + uid + "/getWord/" + this.data.word).subscribe(request =>{
      const wordFromServer = (request as any);     
      this.word.clueFileName = wordFromServer.clueFileName;

      if(this.word.clueFileName === undefined){
        this.word.clueFileName = "";
      }
    })
  }
  
}
