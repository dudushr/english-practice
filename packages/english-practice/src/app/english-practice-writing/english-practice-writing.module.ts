import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPracticeWritingComponent } from './english-practice-writing.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DictationSummaryModule } from '../english-practice/dictation-summary/dictation-summary.module';
import { EnglishPracticeModule } from '../english-practice/english-practice.module';


@NgModule({
  declarations: [EnglishPracticeWritingComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    DictationSummaryModule,
    EnglishPracticeModule,

  ],
  exports: [EnglishPracticeWritingComponent]
})
export class EnglishPracticeWritingModule { }
