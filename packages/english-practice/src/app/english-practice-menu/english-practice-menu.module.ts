import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishPracticeModule } from '../english-practice/english-practice.module';
import { EnglishPracticeMenuComponent } from './english-practice-menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { DictionaryManagerComponent } from './dictionary-manager/dictionary-manager.component';
import { UiComponentsModule } from '@myorg/ui-components';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [EnglishPracticeMenuComponent, DictionaryManagerComponent],
  imports: [
    CommonModule,
    EnglishPracticeModule,
    MatTabsModule,
    MatTableModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatTabsModule,
    MatIconModule,
    UiComponentsModule,
  ],
  
  exports: [EnglishPracticeMenuComponent],
})
export class EnglishPracticeMenuModule {}