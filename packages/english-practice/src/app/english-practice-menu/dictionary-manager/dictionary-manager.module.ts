import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UiComponentsModule } from '@myorg/ui-components';
import { DictionaryManagerComponent } from './dictionary-manager.component';
import { WordEditorModule } from './word-editor/word-editor.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DictionaryStatisticsModule } from './dictionary-statistics/dictionary-statistics.module';


@NgModule({
  declarations: [
    DictionaryManagerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    UiComponentsModule,
    WordEditorModule,
    MatPaginatorModule,
    DictionaryStatisticsModule,
  ],
  exports: [DictionaryManagerComponent],
})
export class DictionaryManagerModule {}
