import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPracticeModule } from '../english-practice/english-practice.module';
import { EnglishPracticeMenuComponent } from './english-practice-menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [EnglishPracticeMenuComponent],
  imports: [
    CommonModule,
    EnglishPracticeModule,
    MatTabsModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatTabsModule,
    MatIconModule
  ],
  exports: [EnglishPracticeMenuComponent]
})
export class EnglishPracticeMenuModule { }
