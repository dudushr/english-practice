import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'myorg-english-word',
  templateUrl: './english-word.component.html',
  styleUrls: ['./english-word.component.scss'],
})
export class EnglishWordComponent implements OnInit {
  englishWord = "";
  hebrewWord: Array<string> = new Array<string>();


  constructor() {}

  ngOnInit(): void {
    this.hebrewWord.push("");
  }

  public clone(): EnglishWordComponent{
    const cloneWord = new EnglishWordComponent();
    cloneWord.englishWord = this.englishWord;
    cloneWord.hebrewWord = this.hebrewWord;

    return cloneWord;
  }
}
