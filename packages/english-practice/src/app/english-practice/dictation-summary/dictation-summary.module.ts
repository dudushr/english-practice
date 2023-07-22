import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictationSummaryComponent } from './dictation-summary.component';



@NgModule({
  declarations: [DictationSummaryComponent],
  imports: [
    CommonModule
  ],
  exports: [DictationSummaryComponent]
})
export class DictationSummaryModule { }
