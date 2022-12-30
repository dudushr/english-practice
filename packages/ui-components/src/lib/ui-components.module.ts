import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HebrewTextFieldComponent } from './hebrew-text-field/hebrew-text-field.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HebrewTextFieldComponent],
  exports: [HebrewTextFieldComponent]
})
export class UiComponentsModule {}
