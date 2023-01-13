import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DictionaryComponent } from '../../dictionary/dictionary/dictionary.component';
import { EnglishWordComponent } from '../../dictionary/english-word/english-word.component';

@Component({
  selector: 'myorg-dictionary-manager',
  templateUrl: './dictionary-manager.component.html',
  styleUrls: ['./dictionary-manager.component.scss'],
})
export class DictionaryManagerComponent  implements OnInit {
  
  dictionary: DictionaryComponent = new DictionaryComponent();
  newWord: EnglishWordComponent = new EnglishWordComponent();
  dataSource : EnglishWordComponent[] = [ ];
  displayedColumns: string[] = ['English', 'Hebrew'];
  _jsonURL = "dictionary.json"

  @ViewChild(MatTable)
  table!: MatTable<EnglishWordComponent>;

  @ViewChild('txtEnglishWord') txtEnglishWord!: ElementRef;

  ngOnInit(): void {
    console.log("Start");
    fetch('assets/dictionary.json').then(res => res.json())
    .then(jsonData => {
      console.log(jsonData);
      const wordsList = jsonData.dictionary.wordsList;
      wordsList.forEach((word: any) => {
        console.log(word);
        this.dictionary.addWord(word);
        this.dataSource .push(word);
      });
      this.table.renderRows();
    });

    this.newWord.hebrewWord = new Array<string>();
    this.newWord.hebrewWord.push("");
  }



  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
     console.log(data);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  addNewWord(){
    this.dictionary.addWord(this.newWord.clone());
    this.dataSource .push(this.newWord.clone());
    this.table.renderRows();

    this.cleanFields();
  }

  onKeyEnglishWord(event: any) { // without type info
    this.newWord.englishWord = event.target.value;
  }

  onKeyHebrewWord(event: any) { // without type info
    this.newWord.hebrewWord = event.target.value;
  }

  cleanFields(){
    this.newWord.englishWord = "";
    this.newWord.hebrewWord = new Array<string>();
    this.newWord.hebrewWord.push("");

    this.txtEnglishWord.nativeElement.focus();
  }

}
