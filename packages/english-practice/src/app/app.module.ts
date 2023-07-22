import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { EnglishWordComponent } from './dictionary/english-word/english-word.component';
import { EnglishPracticeComponent } from './english-practice/english-practice.component';
import { EnglishPracticeMenuComponent } from './english-practice-menu/english-practice-menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EnglishPracticeModule } from './english-practice/english-practice.module';
import { EnglishPracticeMenuModule } from './english-practice-menu/english-practice-menu.module';
import { DictionaryComponent } from './dictionary/dictionary/dictionary.component';
import { UiComponentsModule } from '@myorg/ui-components';
import { HttpClientModule } from '@angular/common/http';
import { DictationComponent } from './dictation/dictation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WordEditorModule } from './english-practice-menu/dictionary-manager/word-editor/word-editor.module';
import { LoginEnglishPracticeComponent } from './login-english-practice/login-english-practice.component';
import { LoginEnglishPracticeModule } from './login-english-practice/login-english-practice.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnglishPracticeConfigurationModule } from './english-practice-menu/english-practice-configuration/english-practice-configuration.module';
import { DictionaryStatisticsModule } from './english-practice-menu/dictionary-manager/dictionary-statistics/dictionary-statistics.module';


@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DictationComponent,
    LoginEnglishPracticeComponent,
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    EnglishPracticeMenuModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    UiComponentsModule,
    WordEditorModule,
    LoginEnglishPracticeModule,
    MatSelectModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    EnglishPracticeConfigurationModule,
    DictionaryStatisticsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
