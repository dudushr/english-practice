import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPracticeSelectorComponent } from './english-practice-selector.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { EnglishPracticeModule } from '../english-practice/english-practice.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EnglishPracticeWritingModule } from '../english-practice-writing/english-practice-writing.module';


@NgModule({
  declarations: [EnglishPracticeSelectorComponent],
  imports: [
    CommonModule, 
    MatButtonToggleModule,
    EnglishPracticeModule,
    EnglishPracticeWritingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
    
  ],
  exports: [ EnglishPracticeSelectorComponent ]
})
export class EnglishPracticeSelectorModule { }
