import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnglishWordComponent } from '../dictionary/english-word/english-word.component';
import { ConfigChanged, EnglishConfigurationService } from '../services/english-configuration.service';
import { EpHttpServiceService } from '../services/ep-http-service.service';
import { LoginManagerService } from '../services/login-manager.service';
import { EnglishPracticeComponent } from '../english-practice/english-practice.component';
import { DictationComponent } from '../dictation/dictation.component';
import { DictionaryComponent } from '../dictionary/dictionary/dictionary.component';
import { DictationWordComponent } from '../dictation/dictation-word/dictation-word.component';
import { HebrewTextFieldComponent } from 'packages/ui-components/src/lib/hebrew-text-field/hebrew-text-field.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'myorg-english-practice-writing',
  templateUrl: './english-practice-writing.component.html',
  styleUrls: ['./english-practice-writing.component.scss'],
})
export class EnglishPracticeWritingComponent implements OnInit, ConfigChanged {
  NUM_OF_WORDS_IN_DICTATION = 4;

  @ViewChild(HebrewTextFieldComponent) txtAnswer?: HebrewTextFieldComponent;

  dictionary: DictionaryComponent = new DictionaryComponent();
  dictation: DictationComponent = new DictationComponent();
  currentQuestionWordIndex = 0;
  currentQuestionWord: EnglishWordComponent = new EnglishWordComponent();
  currentAnswernWord: EnglishWordComponent = new EnglishWordComponent();
  message = "";
  status = EnglishPracticeComponent.DICTATION_NOT_STARTED;
  audioExitance:  Map<string, boolean> = new Map();
  formGroup!: FormGroup;


  constructor(private http: HttpClient, private loginService: LoginManagerService, 
    public dialog: MatDialog, 
    private formBuilder: FormBuilder,
    private configurationService: EnglishConfigurationService, 
    private epService: EpHttpServiceService) {
this.configurationService.addConfigChangedListener(this);
this.NUM_OF_WORDS_IN_DICTATION = configurationService.getNumOfWordsInDictation();    
}


ngOnInit(): void {
  console.log("Start - " + this.currentAnswernWord.hebrewWord[0]);
  this.formGroup = this.formBuilder.group({
    englishWord: [''] // Initialize the form control with a default value if needed
  });

  const uid = this.loginService.getUser();
  this.http.get(this.epService.getServerUrl() + "/dictionary/get/" + uid).subscribe(request =>{
      const wordsList = (request as any).dictionary;
      wordsList.forEach((word: any) => {
        console.log(word);
        const wordToPush = new EnglishWordComponent();
        wordToPush.initWord(word);
        this.dictionary.addWord(wordToPush);        
      });

      this.dictation.add(this.dictionary.createWrittingDictation(this.NUM_OF_WORDS_IN_DICTATION));

      this.currentQuestionWord = this.dictation.getNext();
      this.configurationService.refresh();
      this.updateHasAudioMap(this.currentQuestionWord.englishWord);   

  })
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

  configChangedAction(): void {
    this.NUM_OF_WORDS_IN_DICTATION = this.configurationService.getNumOfWordsInDictation();
  }


  checkAnswer(){
    console.log("Check...");
    if(this.status != EnglishPracticeComponent.WAITING_FOR_QUESTION){
      this.nextQuestion();
    }else{      
        if(this.currentAnswernWord.englishWord.trim() != ""){
          if(this.currentQuestionWord.englishWord.toLowerCase() === this.currentAnswernWord.englishWord.toLowerCase()){
            this.message = "תשובה נכונה!!!"
            this.status = EnglishPracticeComponent.ANSWER_CORRECT;
            this.currentQuestionWord.updateLevelWrite(EnglishWordComponent.SUCCESS);
            this.currentQuestionWord.lastDictationDate = new Date();
            this.dictation.updateStatus(DictationWordComponent.CORRECT_ANSWER);            
          }else{
            this.message = "טעות - התשובה הנכונה היא: " + this.currentQuestionWord.englishWord;
            this.status = EnglishPracticeComponent.ANSWER_MISTAKE;
            this.currentQuestionWord.updateLevelWrite(EnglishWordComponent.WRONG);
            this.currentQuestionWord.lastDictationDate = new Date();
            this.dictation.updateStatus(DictationWordComponent.WRONG_ANSWER);
            this.dictation.updateOriginAnswer(this.currentAnswernWord.englishWord);
          }
          this.txtAnswer?.focus(); 
        }
    }
  }

  nextQuestion(){
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

}
