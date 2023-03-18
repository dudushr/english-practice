import { Component, OnInit } from '@angular/core';
import { EnglishWordComponent } from '../english-word/english-word.component';

@Component({
  selector: 'myorg-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnInit {
  dictionary: Array<EnglishWordComponent> = [];


  constructor() {}

  ngOnInit(): void {

  }

  public addWord(word: EnglishWordComponent){
    if(!this.isWordExistInDictionary(word)){
      this.dictionary.push(word);
    }
  }


  public isWordExistInDictionary(word: EnglishWordComponent): boolean{
   for(let i=0; i<this.dictionary.length; i++){
      if(this.dictionary[i].englishWord === word.englishWord){
       return true;
      }
    }

    return false;
  }

  public getDictionary(): Array<EnglishWordComponent>{
    return this.dictionary;
  }

  public createDictation(numOfWords: number): Array<EnglishWordComponent>{
    const dictation = new Array<EnglishWordComponent>();

    for(let i=0; i<Math.min(numOfWords, this.dictionary.length); i++){
      dictation.push(this.dictionary[i]);
    }

    return dictation;
  }
}
