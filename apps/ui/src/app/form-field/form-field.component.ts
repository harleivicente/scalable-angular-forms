import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldLabelComponent } from '../field-label/field-label.component';
import { SelectComponent } from '../select/select.component';
import { TextInputDirective } from '../text-input.directive';

@Component({
  selector: 'pct-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  exportAs: "formField"
})
export class FormFieldComponent implements OnInit {
  @ContentChild(FormControlName, { static: true }) formControlName: FormControlName;
  @ContentChild(FieldLabelComponent, { static: true }) fieldLabel: FieldLabelComponent;

  // Field types
  @ContentChild(TextInputDirective, { static: true }) textInput: TextInputDirective;
  @ContentChild(SelectComponent, { static: true }) selectInput: SelectComponent;

  constructor() {}

  ngOnInit() {
    this.generateAndSetId();
  }

  get blur$() : Observable<void> {
    if (this.textInput) return this.textInput.blur$;
    if (this.selectInput) return this.selectInput.blur$;
    return null;
  }

  get control() {
    return this.formControlName ? this.formControlName.control : null;
  }

  private generateAndSetId() {
    const id = `pct-field-${Math.trunc(Math.random() * 10000)}`;
    if (this.textInput) {
      this.textInput.elemenetRef.nativeElement.setAttribute('id', id);
    }
    if (this.selectInput) {
      this.selectInput.elemenetRef.nativeElement.setAttribute('id', id);
    }
    if (this.fieldLabel) {
      this.fieldLabel.setForAttribute(id);
    }
  }

}
    