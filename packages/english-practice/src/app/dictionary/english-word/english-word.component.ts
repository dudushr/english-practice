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
  levelWrite = 0;
  includeWriteTest = false;
  lastDictationDate = new Date();
  clueFileName = "";



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
    this.hebrewWord = word.hebrewWord;
    if(word.level){
      this.level = word.level;
    }

    if(word.lastDictationDate){
      this.lastDictationDate = word.lastDictationDate;
    }

    if(word.clueFileName){
      this.clueFileName = word.clueFileName;
    }

    if(word.levelWrite){
      this.levelWrite = word.levelWrite;
    }

    if(word.includeWriteTest){
      this.includeWriteTest = word.includeWriteTest;
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

  public updateLevelWrite(status: number): void{
    if(status === EnglishWordComponent.SUCCESS){
      if(this.levelWrite < 6){
        this.levelWrite += 1
      }else{
        this.levelWrite += 4
      }
    }else if(status === EnglishWordComponent.WRONG){
      this.levelWrite = this.levelWrite - 2;
      if(this.levelWrite < 0){
        this.levelWrite = 0;
      }
    }
  }

  public test(){
    console.log('Test');
  }

  public addHebrewWord(hebrew: string){
    if(this.hebrewWord[0] == ""){
      this.hebrewWord[0] = hebrew;
    }else{
      this.hebrewWord.push(hebrew);
    }
  }

  public getLastHebrewWord(): string{
    console.log("getLastHebrewWord");
    return this.hebrewWord[this.hebrewWord.length -1];
  }

  public removeHebrewWord(index: number){
    this.hebrewWord.splice(index, 1);
    if(this.hebrewWord.length == 0){
      this.hebrewWord.push("");
    }
  }


  public checkAnswer(answer: string){
    for(let i=0; i<this.hebrewWord.length; i++){
      if(answer === this.hebrewWord[i]){
        return true;
      }
    }

    

    return false;
  }
}
