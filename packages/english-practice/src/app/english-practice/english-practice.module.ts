import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPracticeComponent } from './english-practice.component';
import { UiComponentsModule } from '@myorg/ui-components';
import { DictationSummaryComponent } from './dictation-summary/dictation-summary.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { EnglishPuzzleComponent } from './english-puzzle/english-puzzle.component';
import { DictationSummaryModule } from './dictation-summary/dictation-summary.module';

@NgModule({
  declarations: [
    EnglishPracticeComponent,    
    EnglishPuzzleComponent,
  ],
  imports: [CommonModule, UiComponentsModule, NgxAudioPlayerModule,DictationSummaryModule],
  exports: [EnglishPracticeComponent],
})
export class EnglishPracticeModule {}
