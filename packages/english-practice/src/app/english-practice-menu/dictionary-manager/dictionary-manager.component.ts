import { Component, OnInit } from '@angular/core';
import { DictionaryComponent } from '../../dictionary/dictionary/dictionary.component';
import { EnglishWordComponent } from '../../dictionary/english-word/english-word.component';

@Component({
  selector: 'myorg-dictionary-manager',
  templateUrl: './dictionary-manager.component.html',
  styleUrls: ['./dictionary-manager.component.scss'],
})
export class DictionaryManagerComponent  {
  dictionary: DictionaryComponent = new DictionaryComponent();
  newWord: EnglishWordComponent = new EnglishWordComponent();




  addNewWord(){
    this.dictionary.addWord(this.newWord.clone());
  }

  onKeyEnglishWord(event: any) { // without type info
    this.newWord.englishWord = event.target.value;
  }

  onKeyHebrewWord(event: any) { // without type info
    this.newWord.hebrewWord = event.target.value;
  }

}
