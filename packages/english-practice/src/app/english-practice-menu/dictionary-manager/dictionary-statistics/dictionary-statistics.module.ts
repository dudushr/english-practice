import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryStatisticsComponent } from './dictionary-statistics.component';



@NgModule({
  declarations: [DictionaryStatisticsComponent],
  imports: [
    CommonModule
  ],
  exports: [DictionaryStatisticsComponent]
})
export class DictionaryStatisticsModule { }
