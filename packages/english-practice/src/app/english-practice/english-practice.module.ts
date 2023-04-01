import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPracticeComponent } from './english-practice.component';
import { UiComponentsModule } from '@myorg/ui-components';
import { DictationSummaryComponent } from './dictation-summary/dictation-summary.component';

@NgModule({
  declarations: [EnglishPracticeComponent, DictationSummaryComponent],
  imports: [CommonModule, UiComponentsModule],
  exports: [EnglishPracticeComponent],
})
export class EnglishPracticeModule {}
