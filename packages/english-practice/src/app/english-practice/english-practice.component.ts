import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DictionaryComponent } from '../dictionary/dictionary/dictionary.component';
import { EnglishWordComponent } from '../dictionary/english-word/english-word.component';

@Component({
  selector: 'myorg-english-practice',
  templateUrl: './english-practice.component.html',
  styleUrls: ['./english-practice.component.scss'],
})
export class EnglishPracticeComponent implements OnInit {
  dictionary: DictionaryComponent = new DictionaryComponent();
  currentWord: EnglishWordComponent = new EnglishWordComponent();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("Start");
    this.http.get("http://localhost:8080/dictionary/get").subscribe(request =>{
      const wordsList = (request as any).dictionary.wordsList;
      wordsList.forEach((word: any) => {
        console.log(word);
        this.dictionary.addWord(word);
      });

      this.currentWord = wordsList[0];
    })
  }
}
