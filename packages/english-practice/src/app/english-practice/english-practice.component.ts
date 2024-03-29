import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DictationWordComponent } from '../dictation/dictation-word/dictation-word.component';
import { DictationComponent } from '../dictation/dictation.component';
import { DictionaryComponent } from '../dictionary/dictionary/dictionary.component';
import { EnglishWordComponent } from '../dictionary/english-word/english-word.component';
import { LoginManagerService } from '../services/login-manager.service';
import { ConfigChanged, EnglishConfigurationService } from '../services/english-configuration.service';
import { EpHttpServiceService } from '../services/ep-http-service.service';
import { HebrewTextFieldComponent } from 'packages/ui-components/src/lib/hebrew-text-field/hebrew-text-field.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EnglishPuzzleComponent } from './english-puzzle/english-puzzle.component';

@Component({
  selector: 'myorg-english-practice',
  templateUrl: './english-practice.component.html',
  styleUrls: ['./english-practice.component.scss'],
})
export class EnglishPracticeComponent implements OnInit, ConfigChanged {
  public static DICTATION_NOT_STARTED = 0;
  public static ANSWER_CORRECT = 1;
  public static ANSWER_MISTAKE = 2;
  public static WAITING_FOR_QUESTION = 3;
  public static DICTATION_ENDED = 5;

  _DICTATION_NOT_STARTED = EnglishPracticeComponent.DICTATION_NOT_STARTED;
  _ANSWER_CORRECT = EnglishPracticeComponent.ANSWER_CORRECT;
  _ANSWER_MISTAKE = EnglishPracticeComponent.ANSWER_MISTAKE;
  _WAITING_FOR_QUESTION = EnglishPracticeComponent.WAITING_FOR_QUESTION;
  _DICTATION_ENDED = EnglishPracticeComponent.DICTATION_ENDED;

  NUM_OF_WORDS_IN_DICTATION = 4;

  @ViewChild(HebrewTextFieldComponent) txtAnswer?: HebrewTextFieldComponent;

  dictionary: DictionaryComponent = new DictionaryComponent();
  dictation: DictationComponent = new DictationComponent();
  currentQuestionWordIndex = 0;
  currentQuestionWord: EnglishWordComponent = new EnglishWordComponent();
  currentAnswernWord: EnglishWordComponent = new EnglishWordComponent();
  message = "";
  status = EnglishPracticeComponent.DICTATION_NOT_STARTED;
  clueImageData: any = null;
  audioExitance:  Map<string, boolean> = new Map();

  constructor(private http: HttpClient, private loginService: LoginManagerService, 
        public dialog: MatDialog, 
        private configurationService: EnglishConfigurationService, 
        private epService: EpHttpServiceService) {
    this.configurationService.addConfigChangedListener(this);
    this.NUM_OF_WORDS_IN_DICTATION = configurationService.getNumOfWordsInDictation();    
  }
  

  ngOnInit(): void {
    console.log("Start - " + this.currentAnswernWord.hebrewWord[0]);
    const uid = this.loginService.getUser();
    this.http.get(this.epService.getServerUrl() + "/dictionary/get/" + uid).subscribe(request =>{
      const wordsList = (request as any).dictionary;
      wordsList.forEach((word: any) => {
        console.log(word);
        const wordToPush = new EnglishWordComponent();
        wordToPush.initWord(word);
        this.dictionary.addWord(wordToPush);        
      });

      this.dictation.add(this.dictionary.createDictation(this.NUM_OF_WORDS_IN_DICTATION));

      this.currentQuestionWord = this.dictionary.getDictionary()[this.currentQuestionWordIndex];
      this.configurationService.refresh();
      this.updateHasAudioMap(this.currentQuestionWord.englishWord);   
      //this.openPuzzle();
    })
  }



  checkAnswer(){
    console.log("Check...");
    if(this.status != EnglishPracticeComponent.WAITING_FOR_QUESTION){
      this.nextQuestion();
    }else{      
        if(this.currentAnswernWord.hebrewWord[0].trim() != ""){
          if(this.currentQuestionWord.checkAnswer(this.currentAnswernWord.hebrewWord[0])){
            this.message = "תשובה נכונה!!!"
            this.status = EnglishPracticeComponent.ANSWER_CORRECT;
            this.currentQuestionWord.updateLevel(EnglishWordComponent.SUCCESS);
            this.currentQuestionWord.lastDictationDate = new Date();
            this.dictation.updateStatus(DictationWordComponent.CORRECT_ANSWER);            
          }else{
            this.message = "טעות - התשובה הנכונה היא: " + this.currentQuestionWord.hebrewWord;
            this.status = EnglishPracticeComponent.ANSWER_MISTAKE;
            this.currentQuestionWord.updateLevel(EnglishWordComponent.WRONG);
            this.currentQuestionWord.lastDictationDate = new Date();
            this.dictation.updateStatus(DictationWordComponent.WRONG_ANSWER);
            this.dictation.updateOriginAnswer(this.currentAnswernWord.hebrewWord[0]);
          }
          this.txtAnswer?.focus(); 
        }
    }
  }

  nextQuestion(){
    this.clueImageData = null;
    if(this.dictation.hasNext()){
      this.currentQuestionWord = this.dictation.getNext();
      this.currentAnswernWord = new EnglishWordComponent();
      this.status = EnglishPracticeComponent.WAITING_FOR_QUESTION;
      this.message = "";
      this.updateHasAudioMap(this.currentQuestionWord.englishWord);
      this.txtAnswer?.focus(); 
    }else{
      this.message = "סיימת את ההכתבה"
      this.status = EnglishPracticeComponent.DICTATION_ENDED;
      this.saveDictionary();
    }
  }


  saveDictionary(){
    this.updateLevel();
  }

  updateLevel(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };

    const httpParams = new HttpParams()
    .append("dictionary", JSON.stringify(this.dictionary))
    .append("uid", this.loginService.getUser());
    
    

    this.http.post(this.epService.getServerUrl() + "/dictionary/updateLevel", httpParams, httpOptions).subscribe(request =>{
      console.log("Updated");
    });   
  }

  showDictation(): boolean{
    if(this.status !== EnglishPracticeComponent.DICTATION_NOT_STARTED && this.status != EnglishPracticeComponent.DICTATION_ENDED){     
      return true; 
    }

    return false;
  }

  showSummary(): boolean{
    return (this.status === EnglishPracticeComponent.DICTATION_ENDED);
  }

  startNewDictation(){
    this.dictionary = new DictionaryComponent();
    this.dictation = new DictationComponent();
    this.currentQuestionWordIndex = 0;
    this.currentQuestionWord = new EnglishWordComponent();
    this.currentAnswernWord = new EnglishWordComponent();
    this.message = "";

    this.dictation.add(this.dictionary.createDictation(this.NUM_OF_WORDS_IN_DICTATION));

    this.currentQuestionWord = this.dictionary.getDictionary()[this.currentQuestionWordIndex];
    
    this.ngOnInit();
    this.status = EnglishPracticeComponent.WAITING_FOR_QUESTION;
  }

  configChangedAction(): void {
    this.NUM_OF_WORDS_IN_DICTATION = this.configurationService.getNumOfWordsInDictation();
  }

  getClueImage() {
    const uid = this.loginService.getUser();
    const serviceUrl = this.epService.getServerUrl() + "/clue/" + uid + "/" + this.currentQuestionWord.englishWord;
    this.http.get(serviceUrl, { responseType: 'blob' })
      .subscribe(response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.clueImageData = reader.result;
        };
        reader.readAsDataURL(response);
      });
  }

  getClassName(className: string){
    return this.configurationService.getClassName(className);
  }

  showClue(): boolean{
    const hasClue = (this.currentQuestionWord.clueFileName.length > 0);
    const showClueUntilLevel = parseInt(""+this.configurationService.getShowClueUntilLevel());
    const isShowClue = (this.currentQuestionWord.level <= showClueUntilLevel)

    return hasClue && isShowClue;
  }

  playAudio(englishWord: string) {
    const audioUrl = this.epService.getServerUrl() + "/audio/" + englishWord;

    const audio = new Audio(audioUrl);
    audio.play();
  }

  updateHasAudioMap(englishWord: string): void{
    if(this.audioExitance.get(englishWord) !== null){     
      const audioUrl = this.epService.getServerUrl() + "/audio/" + englishWord;
      this.http.get(audioUrl,  { responseType: 'blob' }).subscribe(
        () => {
          this.audioExitance.set(englishWord, true);
        },
        (error: HttpErrorResponse) => {
          this.audioExitance.set(englishWord, false);
        }
      );
    }
  }

  hasAudio(englishWord: string): boolean{
    const hasAudio = this.audioExitance.get(englishWord);
    return hasAudio === true;
  }


  openPuzzle(){
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = '700px';
    dialogConfig.height = '400px';
    dialogConfig.data = {};

    this.dialog.open(EnglishPuzzleComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(result => {
      this.ngOnInit();
    });
  }
}


