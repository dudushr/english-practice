import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPracticeComponent } from './english-practice.component';
import { UiComponentsModule } from '@myorg/ui-components';



@NgModule({
  declarations: [EnglishPracticeComponent],
  imports: [
    CommonModule,
    UiComponentsModule
  ],
  exports: [EnglishPracticeComponent]
})
export class EnglishPracticeModule { }
