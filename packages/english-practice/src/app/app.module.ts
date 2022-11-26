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

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,    
  ],
  imports: [
    BrowserModule, 
    MatTabsModule, 
    EnglishPracticeMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
