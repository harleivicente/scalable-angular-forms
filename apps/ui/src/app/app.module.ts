import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './form-field/form-field.component';
import { TextInputDirective } from './text-input.directive';
import { FieldLabelComponent } from './field-label/field-label.component';
import { FieldInfoComponent } from './field-info/field-info.component';
import { FieldErrorComponent } from './field-error/field-error.component';
import { SelectDirective } from './select.directive';

@NgModule({
  declarations: [AppComponent, FormFieldComponent, TextInputDirective, FieldLabelComponent, FieldInfoComponent, FieldErrorComponent, SelectDirective],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
