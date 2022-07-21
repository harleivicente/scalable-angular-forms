import { AfterViewInit, Component, ContentChild, ContentChildren, forwardRef, HostListener, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectCurrentDirective } from '../select-current.directive';

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
export class SelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ContentChild(SelectCurrentDirective, { static: true }) currentTemplateDirective: SelectCurrentDirective;
  
  val;
  protected openDropdown = false;

  get valueIsDefined() {
    return !!this.val && typeof this.val !== 'boolean';
  }

  get selectedValueTemplate(): TemplateRef<any> {
    if (this.currentTemplateDirective) {
      return this.currentTemplateDirective.templateRef;
    } else {
      return null;
    }
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  selectOption(value) {
    this.val = value
    this.onChange(value)
    this.onTouch(value)
    this.openDropdown = false;
  }

  protected displayClickHandler() {
    this.openDropdown = !this.openDropdown;
  }

  onChange: any = () => {}

  onTouch: any = () => {}

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
