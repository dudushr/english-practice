import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictationWordComponent } from './dictation-word/dictation-word.component';
import { UiComponentsModule } from '@myorg/ui-components';

@NgModule({
  declarations: [DictationWordComponent],
  imports: [CommonModule, UiComponentsModule,],
})
export class DictationModule {}
