import { Component, ElementRef, OnInit, Optional } from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'pct-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent implements OnInit {

  constructor(
    @Optional() private formField: FormFieldComponent,
    private elementRef: ElementRef<HTMLSpanElement>
  ) {}

  ngOnInit() {
    this.updateErrorVisibility();

    // Update when blured
    if (this.formField && this.formField.blur$) {
      this.formField.blur$.subscribe(() => {
        this.updateErrorVisibility();
      });
    }

    // Update when status change
    if (this.formField && this.formField.control) {
      this.formField.control.statusChanges.subscribe(() => {
        this.updateErrorVisibility();
      }); 
    }
  }

  private updateErrorVisibility() {
    const field = this.formField;
    if (field && field.control) {
        if (field.control.status === "INVALID" && field.control.touched) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  private hide() {
    this.elementRef.nativeElement.style.display = "none";
  }
  
  private show() {
    this.elementRef.nativeElement.style.display = "block";
  }

}
