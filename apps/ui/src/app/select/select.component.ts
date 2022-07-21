import { AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, forwardRef, HostListener, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
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
  private observer: Observer<void>;
  protected isDropdownOpen = false;

  public blur$: Observable<void> = new Observable(observer => {
    this.observer = observer;
  });

  public val;

  set value(val) {
    this.val = val
    this.onChange(val)
    this.onTouch(val)
  }

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

  constructor(public elemenetRef: ElementRef<HTMLInputElement>) {}

  ngOnInit() {
    this.elemenetRef.nativeElement.setAttribute("tabindex", 0);
  }

  ngAfterViewInit() {}

  public selectOption(value) {
    this.val = value
    this.onChange(value)
    this.onTouch(value)
    this.isDropdownOpen = false;
  }

  protected displayClickHandler() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('blur')
  protected blurHandler() {
    this.onTouch();
    this.observer.next();
    this.isDropdownOpen = false;
  }

  onChange: any = () => {}

  onTouch: any = () => {}

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
