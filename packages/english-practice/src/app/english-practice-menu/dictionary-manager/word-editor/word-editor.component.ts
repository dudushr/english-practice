import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EnglishWordComponent } from '../../../dictionary/english-word/english-word.component';
import { LoginManagerService } from '../../../services/login-manager.service';




@Component({
  selector: 'myorg-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.scss'],
})
export class WordEditorComponent implements OnInit {
  word: EnglishWordComponent = new EnglishWordComponent();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<WordEditorComponent>, private http: HttpClient, private loginService: LoginManagerService) {
    const uid = this.loginService.getUser();
    this.http.get("http://localhost:8080/dictionary/" + uid + "/getWord/" + data.word).subscribe(request =>{
      const wordFromServer = (request as any);
      this.word = new EnglishWordComponent();
      this.word.englishWord = wordFromServer.englishWord;
      this.word.hebrewWord = wordFromServer.hebrewWord;
      this.word.level = wordFromServer.level;
      this.word.lastDictationDate = wordFromServer.lastDictationDate;
      if(this.word.level === undefined){
        this.word.level = 0;
      }
        
    });

  }

  ngOnInit(): void {
    
  }

  addNewHebrewWord() {
    if(this.word.getLastHebrewWord() != ""){
      this.word.addHebrewWord("");
    }
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

    
    this.http.post("http://localhost:8080/dictionary/update", httpParams, httpOptions).subscribe(request =>{
      this.dialogRef.close();
    });
  }
}
