import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'myorg-english-word',
  templateUrl: './english-word.component.html',
  styleUrls: ['./english-word.component.scss'],
})
export class EnglishWordComponent implements OnInit {
  englishWord: string = "";
  hebrewWord: Array<String> = new Array<String>();


  constructor() {}

  ngOnInit(): void {}

  public clone(): EnglishWordComponent{
    let cloneWord = new EnglishWordComponent();
    cloneWord.englishWord = this.englishWord;
    cloneWord.hebrewWord = this.hebrewWord;

    return cloneWord;
  }
}
