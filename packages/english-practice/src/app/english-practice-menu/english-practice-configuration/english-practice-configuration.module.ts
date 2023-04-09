import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPracticeConfigurationComponent } from './english-practice-configuration.component';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [EnglishPracticeConfigurationComponent],
  imports: [
    CommonModule,
    MatInputModule,
  ],
  exports: [EnglishPracticeConfigurationComponent]
})
export class EnglishPracticeConfigurationModule { }
