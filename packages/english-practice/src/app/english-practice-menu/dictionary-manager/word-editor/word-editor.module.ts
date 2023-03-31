import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UiComponentsModule } from '@myorg/ui-components';
import { WordEditorComponent } from './word-editor.component';




@NgModule({  
  declarations: [WordEditorComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatButtonModule, 
    UiComponentsModule,
    
  ],
  exports: [WordEditorComponent]
})
export class WordEditorModule { }
