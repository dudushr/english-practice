import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DictationComponent } from '../../dictation/dictation.component';
import { DictationWordComponent } from '../../dictation/dictation-word/dictation-word.component';

@Component({
  selector: 'myorg-dictation-summary',
  templateUrl: './dictation-summary.component.html',
  styleUrls: ['./dictation-summary.component.scss'],
})
export class DictationSummaryComponent implements OnInit {
  @Input() dictationSummary: DictationComponent = new DictationComponent;
  @Input() showSummary = false;
  @Output() onStartNewDictation = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    console.log('showSummary = ' + this.showSummary);
  }

  startDictation(){
    this.onStartNewDictation.emit("startDictation");
  }

  getWordSummaryClass(word: DictationWordComponent): string{
    return word.isCorrectAtFirstAttempt() ? 'goodAnswer' : 'wrongAnswer'
  }
}
