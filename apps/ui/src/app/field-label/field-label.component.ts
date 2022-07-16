import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'pct-field-label',
  templateUrl: './field-label.component.html',
  styleUrls: ['./field-label.component.scss']
})
export class FieldLabelComponent implements OnInit {
  @ViewChild('label', { static: true }) label: ElementRef<HTMLLabelElement>;

  constructor() {}

  ngOnInit() {}

  setForAttribute(value: string) {
    this.label.nativeElement.setAttribute('for', value);
  }

}
