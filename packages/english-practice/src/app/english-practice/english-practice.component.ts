import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DictationWordComponent } from '../dictation/dictation-word/dictation-word.component';
import { DictationComponent } from '../dictation/dictation.component';
import { DictionaryComponent } from '../dictionary/dictionary/dictionary.component';
import { EnglishWordComponent } from '../dictionary/english-word/english-word.component';

@Component({
  selector: 'myorg-english-practice',
  templateUrl: './english-practice.component.html',
  styleUrls: ['./english-practice.component.scss'],
})
export class EnglishPracticeComponent implements OnInit {
  public static NUM_OF_WORDS_IN_DICTATION = 4;

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

  dictionary: DictionaryComponent = new DictionaryComponent();
  dictation: DictationComponent = new DictationComponent();
  currentQuestionWordIndex = 0;
  currentQuestionWord: EnglishWordComponent = new EnglishWordComponent();
  currentAnswernWord: EnglishWordComponent = new EnglishWordComponent();
  message = "";
  status = EnglishPracticeComponent.DICTATION_NOT_STARTED;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("Start - " + this.currentAnswernWord.hebrewWord[0]);
    this.http.get("http://localhost:8080/dictionary/get").subscribe(request =>{
      const wordsList = (request as any).dictionary;
      wordsList.forEach((word: any) => {
        console.log(word);
        const wordToPush = new EnglishWordComponent();
        wordToPush.initWord(word);
        this.dictionary.addWord(wordToPush);        
      });

      this.dictation.add(this.dictionary.createDictation(EnglishPracticeComponent.NUM_OF_WORDS_IN_DICTATION));

      this.currentQuestionWord = this.dictionary.getDictionary()[this.currentQuestionWordIndex];
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
          }
        }
    }
  }

  nextQuestion(){
    if(this.dictation.hasNext()){
      this.currentQuestionWord = this.dictation.getNext();
      this.currentAnswernWord = new EnglishWordComponent();
      this.status = EnglishPracticeComponent.WAITING_FOR_QUESTION;
      this.message = "";
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
    .append("dictionary", JSON.stringify(this.dictionary));
    
    

    this.http.post("http://localhost:8080/dictionary/updateLevel", httpParams, httpOptions).subscribe(request =>{
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

    this.dictation.add(this.dictionary.createDictation(EnglishPracticeComponent.NUM_OF_WORDS_IN_DICTATION));

    this.currentQuestionWord = this.dictionary.getDictionary()[this.currentQuestionWordIndex];
    
    this.ngOnInit();
    this.status = EnglishPracticeComponent.WAITING_FOR_QUESTION;
  }
}
