import { Component, OnInit } from '@angular/core';
import { EnglishWordComponent } from '../dictionary/english-word/english-word.component';
import { DictationWordComponent } from './dictation-word/dictation-word.component';

@Component({
  selector: 'myorg-dictation',
  templateUrl: './dictation.component.html',
  styleUrls: ['./dictation.component.scss'],
})
export class DictationComponent implements OnInit {
  dictation: Array<DictationWordComponent> = [];
  currentIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  public add(wordsList: Array<EnglishWordComponent>) {
    this.dictation = [];
    wordsList.forEach((word: EnglishWordComponent)=>{
      const dictationWord = new DictationWordComponent(word);
    this.dictation.push(dictationWord);
    });
    
  }

  public updateStatus(status: number){
    this.dictation[this.currentIndex].setDictationStatus(status);   
  }

  public updateOriginAnswer(answer: string){
    this.dictation[this.currentIndex].originAnswer = answer;
  }

  public getNext(): EnglishWordComponent {    
    this.currentIndex++;
    if(this.currentIndex === this.dictation.length){
      this.currentIndex = 0;
    }

    while(this.hasNext()){
      if(this.dictation[this.currentIndex].dictationStatus != DictationWordComponent.CORRECT_ANSWER){        
        return this.dictation[this.currentIndex].word;
      }else{
        this.currentIndex++;
        if(this.currentIndex === this.dictation.length){
          this.currentIndex = 0;
        }
      }
    }

    return new EnglishWordComponent();
  }

  public hasNext(): boolean{
    for(let i=0; i<this.dictation.length; i++){
      if(this.dictation[i].dictationStatus != DictationWordComponent.CORRECT_ANSWER){
        return true;
      }
    }

    return false;
  }
}
