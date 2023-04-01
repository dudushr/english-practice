import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EnglishWordComponent } from '../../../dictionary/english-word/english-word.component';




@Component({
  selector: 'myorg-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.scss'],
})
export class WordEditorComponent implements OnInit {
  word: EnglishWordComponent = new EnglishWordComponent();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.word.englishWord = data.word;
    this.word.addHebrewWord("מוטעה");
    this.word.addHebrewWord("שגוי");
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
}
