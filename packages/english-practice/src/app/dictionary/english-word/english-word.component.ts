import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'myorg-english-word',
  templateUrl: './english-word.component.html',
  styleUrls: ['./english-word.component.scss'],
})
export class EnglishWordComponent implements OnInit {
  public static WRONG = 0;
  public static SUCCESS = 1;

  englishWord = "";
  hebrewWord: Array<string> = new Array<string>();
  level = 0;


  constructor() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.hebrewWord.push("");
  }

  public clone(): EnglishWordComponent{
    const cloneWord = new EnglishWordComponent();
    cloneWord.englishWord = this.englishWord;
    cloneWord.hebrewWord = this.hebrewWord;

    return cloneWord;
  }

  public initWord(word: any){
    this.englishWord = word.englishWord;
    this.hebrewWord[0] = word.hebrewWord;
    if(word.level){
      this.level = word.level;
    }
  }

  public updateLevel(status: number): void{
    if(status === EnglishWordComponent.SUCCESS){
      if(this.level < 6){
        this.level += 1
      }else{
        this.level += 4
      }
    }else if(status === EnglishWordComponent.WRONG){
      this.level = this.level - 2;
      if(this.level < 0){
        this.level = 0;
      }
    }
  }

  public test(){
    console.log('Test');
  }
}
