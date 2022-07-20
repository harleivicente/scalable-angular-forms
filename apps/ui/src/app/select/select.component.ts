import { Component, ContentChild, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectCurrentDirective } from '../select-current.directive';
import { SelectOptionDirective } from '../select-option.directive';

@Component({
  selector: 'pct-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() options: object[] = [];
  @ContentChild(SelectCurrentDirective, { static: true }) currentTemplateDirective: SelectCurrentDirective;
  @ContentChild(SelectOptionDirective, { static: true }) optionTemplateDirective: SelectOptionDirective;
  val= "";
  protected openDropdown = false;

  constructor() {}

  ngOnInit() {}

  optionClick(option) {
    this.val = option.nome
    this.onChange(option.nome)
    this.onTouch(option.nome)
    this.openDropdown = false;
  }

  protected displayClickHandler() {
    this.openDropdown = !this.openDropdown;
  }

  onChange: any = () => {}

  onTouch: any = () => {}

  get optionTemplate() {
    if (this.optionTemplateDirective) {
      return this.optionTemplateDirective.templateRef;
    } else {
      return null;
    }
  }

  set value(val) {
    this.val = val
    this.onChange(val)
    this.onTouch(val)
  }

  writeValue(value: any){ 
    this.value = value;
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouch = fn;
  }

}
