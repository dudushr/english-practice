import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DictionaryComponent } from '../../../dictionary/dictionary/dictionary.component';
import { EnglishConfigurationService } from '../../../services/english-configuration.service';

@Component({
  selector: 'myorg-dictionary-statistics',
  templateUrl: './dictionary-statistics.component.html',
  styleUrls: ['./dictionary-statistics.component.scss'],
})
export class DictionaryStatisticsComponent  {
  @Input() dictionary: DictionaryComponent = new DictionaryComponent();

  highLevelWords = 0;
  mediumLevelWords = 0;
  lowLevelWords = 0;

  constructor(private englishConfig: EnglishConfigurationService) {}



  updateStatistics(){
    const wordsList = this.dictionary.dictionary;
    this.highLevelWords = 0;
    this.mediumLevelWords = 0;
    this.lowLevelWords = 0;

    for(let i=0; i<wordsList.length; i++){
      if(wordsList[i].level >= this.englishConfig.highLevelWords){
        this.highLevelWords++;
      }else if(wordsList[i].level <= this.englishConfig.lowLevelWords ){
        this.lowLevelWords++;
      }else{
        this.mediumLevelWords++;
      }
    }
  }
}
