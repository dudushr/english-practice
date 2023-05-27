import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPracticeComponent } from './english-practice.component';
import { UiComponentsModule } from '@myorg/ui-components';
import { DictationSummaryComponent } from './dictation-summary/dictation-summary.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';


@NgModule({
  declarations: [EnglishPracticeComponent, DictationSummaryComponent],
  imports: [
    CommonModule, 
    UiComponentsModule,
    NgxAudioPlayerModule
  ],
  exports: [EnglishPracticeComponent],
})
export class EnglishPracticeModule {}
