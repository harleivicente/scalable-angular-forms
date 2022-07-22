import { AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, forwardRef, HostBinding, HostListener, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
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
  
  @HostBinding('class.dropdown-open')
  protected isDropdownOpen = false;

  private observer: Observer<void>;
  private optionCounter = 0;
  public keyboardSelectionIndex: BehaviorSubject<number> = new BehaviorSubject(null);

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

  constructor(public elemenetRef: ElementRef<HTMLInputElement>) {
    this.elemenetRef.nativeElement.setAttribute("tabindex", "0");
  }

  ngOnInit() {
    this.keyboardSelectionIndex.subscribe(v => console.log(v));
  }

  ngAfterViewInit() {}

  public selectOption(value) {
    this.val = value
    this.onChange(value)
    this.onTouch(value)
    this.isDropdownOpen = false;
  }

  public incrementOptionCount() { this.optionCounter++; }

  public decreaseOptionCount() { this.optionCounter--; }

  protected displayClickHandler() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {

    if (event.key === "ArrowDown") this.handleMoveKeyboardSelection("DOWN")
    if (event.key === "ArrowUp") this.handleMoveKeyboardSelection("UP")

    if (event.key === "Enter") this.isDropdownOpen = !this.isDropdownOpen;
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

  private handleMoveKeyboardSelection(direction: "UP" | "DOWN") {
    const up = direction === "UP";
    const down = direction === "DOWN";
    const numberOfOptions = this.optionCounter;
    const lastIndex = numberOfOptions - 1;
    const currentIndex = this.keyboardSelectionIndex.value;

    if (!this.isDropdownOpen && down) {
      this.isDropdownOpen = true;
      return;
    }

    if (!this.isDropdownOpen && up) {
      return;
    }

    if (currentIndex === null) {
      this.keyboardSelectionIndex.next(down ? 0 : lastIndex);
      return;
    }

    if (up) {
      const negativeOverflow = currentIndex <= 0;
      this.keyboardSelectionIndex.next(negativeOverflow ? lastIndex : currentIndex - 1);
      return;
    }
    
    if (down) {
      const positiveOverflow = currentIndex === lastIndex;
      this.keyboardSelectionIndex.next(positiveOverflow ? 0 : currentIndex + 1);
      return;
    }
  }

}
