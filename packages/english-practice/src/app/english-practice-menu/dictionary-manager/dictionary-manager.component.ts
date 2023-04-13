import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DictionaryComponent } from '../../dictionary/dictionary/dictionary.component';
import { EnglishWordComponent } from '../../dictionary/english-word/english-word.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { WordEditorComponent } from './word-editor/word-editor.component';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { LoginManagerService } from '../../services/login-manager.service';
import { DictionaryStatisticsComponent } from './dictionary-statistics/dictionary-statistics.component';
import { EnglishConfigurationService } from '../../services/english-configuration.service';

@Component({
  selector: 'myorg-dictionary-manager',
  templateUrl: './dictionary-manager.component.html',
  styleUrls: ['./dictionary-manager.component.scss'],
})
export class DictionaryManagerComponent  implements OnInit {   
  dictionary: DictionaryComponent = new DictionaryComponent();
  newWord: EnglishWordComponent = new EnglishWordComponent();
 // dataSource : EnglishWordComponent[] = [ ];
  dataSource = new MatTableDataSource<EnglishWordComponent>();
  displayedColumns: string[] = ['English', 'Hebrew', 'Level', 'Date', 'Edit', 'Remove'];
  _jsonURL = "dictionary.json"

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;  
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatTable) table!: MatTable<EnglishWordComponent>;
  @ViewChild('txtEnglishWord') txtEnglishWord!: ElementRef;
  @ViewChild(DictionaryStatisticsComponent) dictionaryStatisticsComponent!: DictionaryStatisticsComponent;

  
  ngOnInit(): void {
    console.log("Start");
    
    this.dataSource = new MatTableDataSource<EnglishWordComponent>();

    this.http.get("http://localhost:8080/dictionary/get/" + this.loginService.getUser()).subscribe(request =>{
      const wordsList = (request as any).dictionary;
      wordsList.forEach((word: any) => {
        const wordToPush = new EnglishWordComponent();
        wordToPush.initWord(word);
        this.dictionary.addWord(wordToPush);
        this.dataSource.data.push(wordToPush);
        this.dictionaryStatisticsComponent.updateStatistics();
      });
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource.sort = this.sort as MatSort;
      this.table.renderRows();
      
      
    });
  
    this.newWord.hebrewWord = new Array<string>();
    this.newWord.hebrewWord.push("");
  }



  constructor(private http: HttpClient, 
      public dialog: MatDialog, 
      private _liveAnnouncer: LiveAnnouncer, 
      private loginService: LoginManagerService,
      private englishConfig: EnglishConfigurationService) {
   this.loginService.setDictionaryManager(this);
  }

  

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  addNewWord(){
    this.dictionary.addWord(this.newWord.clone());
    this.dataSource.data.push(this.newWord.clone());
    this.table.renderRows();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const httpParams = new HttpParams()
    .append("englishWord", this.newWord.englishWord)
    .append("hebrewWord", this.newWord.hebrewWord[0])
    .append("uid", this.loginService.getUser());
    

    this.http.post("http://localhost:8080/dictionary/add", httpParams, httpOptions).subscribe(request =>{
      this.ngOnInit();
      this.table.renderRows();
    });

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

  getDictionary(){
    fetch('assets/dictionary.json').then(res => res.json())
    .then(jsonData => {
      console.log(jsonData);
      const wordsList = jsonData.dictionary.wordsList;
      wordsList.forEach((word: any) => {
        console.log(word);
        this.dictionary.addWord(word);
        this.dataSource.data.push(word);
      });
      this.table.renderRows();
    });
  }

  removeWord(englishWord: string): void{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const httpParams = new HttpParams()
    .append("englishWord", englishWord)
    .append("uid", this.loginService.getUser());
   
    this.http.post("http://localhost:8080/dictionary/remove", httpParams, httpOptions).subscribe(request =>{
      this.ngOnInit();
      
      this.table.renderRows();
    });
  }

  editWord(englishWord: string): void{
    console.log('Edit....');

    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = '700px';
    dialogConfig.height = '400px';
    dialogConfig.data = {word: englishWord};

    this.dialog.open(WordEditorComponent, dialogConfig);
  }


  announceSortChange(sortState: Sort) {
    let sortType = "";
    if(sortState.active === "English"){
      sortType = "englishWord";
    }else if(sortState.active === "Hebrew"){
      sortType = "hebrewWord";
    }else if(sortState.active === "Level"){
      sortType = "level";
    }else if(sortState.active === "Date"){
      sortType = "lastDictationDate";


      
    }


   
      this.dataSource.data.sort((a: any, b: any) => { 
        let obj1 = a[sortType];
        let obj2 = b[sortType];
        if(sortState.direction === "desc"){
          obj1 = b[sortType];
          obj2 = a[sortType];
        }
        
        if(sortType === "englishWord"){
          obj1 = obj1.toLowerCase();
          obj2 = obj2.toLowerCase();
        }else if(sortType === "hebrewWord"){
          obj1 = obj1[0];
          obj2 = obj2[0];
        }
        
        if (obj1 < obj2) {
            return -1;
        } else if (obj1 > obj2) {
            return 1;
        } else {
            return 0;
        }
    });
  
  

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  getTableRowColor(level: number){         
    let className =""
    if(level >= this.englishConfig.highLevelWords){
      className = "highLevel";
    }else if(level <= this.englishConfig.lowLevelWords ){
      className = "lowLevel";
    }else{
      className = "mediumLevel";
    }
      
    return className;
  }

}
