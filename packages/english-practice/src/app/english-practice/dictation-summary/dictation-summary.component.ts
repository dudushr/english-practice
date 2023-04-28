import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DictationComponent } from '../../dictation/dictation.component';
import { DictationWordComponent } from '../../dictation/dictation-word/dictation-word.component';
import { EnglishConfigurationService } from '../../services/english-configuration.service';

@Component({
  selector: 'myorg-dictation-summary',
  templateUrl: './dictation-summary.component.html',
  styleUrls: ['./dictation-summary.component.scss'],
})
export class DictationSummaryComponent implements OnInit {
  @Input() dictationSummary: DictationComponent = new DictationComponent;
  @Input() showSummary = false;
  @Output() onStartNewDictation = new EventEmitter<string>();

  device = "desktop";

  constructor(private configurationService: EnglishConfigurationService) {}

  ngOnInit(): void {
    console.log('showSummary = ' + this.showSummary);
    this.device = this.configurationService.getDevice();
  }

  startDictation(){
    this.onStartNewDictation.emit("startDictation");
  }

  getWordSummaryClass(word: DictationWordComponent): string{
    return word.isCorrectAtFirstAttempt() ? 'goodAnswer' : 'wrongAnswer'
  }

  getClassName(className: string){
    console.log(this.device + '_' + className);
    return this.device + '_' + className;
  }
}
