import { Component, OnInit } from '@angular/core';
import { EnglishWordComponent } from '../../dictionary/english-word/english-word.component';

@Component({
  selector: 'myorg-dictation-word',
  templateUrl: './dictation-word.component.html',
  styleUrls: ['./dictation-word.component.scss'],
})
export class DictationWordComponent implements OnInit {
  public static  NOT_TESTED_YET = 0;
  public static  CORRECT_ANSWER = 1;
  public static  WRONG_ANSWER = 2;
  
  word: EnglishWordComponent = new EnglishWordComponent();
  dictationStatus = DictationWordComponent.NOT_TESTED_YET;
  correctAnswerAtFirstAttempt = true;
  originAnswer = "";

  constructor(word: EnglishWordComponent) {
    this.word = word;
    this.dictationStatus = DictationWordComponent.NOT_TESTED_YET;    
  }

  ngOnInit(): void {}


  public setDictationStatus(status: number){
    this.dictationStatus = status;

    if(status === DictationWordComponent.WRONG_ANSWER){
      this.correctAnswerAtFirstAttempt = false;
    }
  }

  public getDictationStatus(){
    return this.dictationStatus;
  }

  public isCorrectAtFirstAttempt(){
    return this.correctAnswerAtFirstAttempt;
  }

  public getHebrewWordAsString() : string{
    const hebrewWordList = this.word.hebrewWord;
    let hebrewWordListStr = "";
    for(let i=0; i<hebrewWordList.length; i++){
      hebrewWordListStr += hebrewWordList[i];
      if(i< hebrewWordList.length - 1){
        hebrewWordListStr += ", ";
      }
    }

    return hebrewWordListStr;
  }
  

}
