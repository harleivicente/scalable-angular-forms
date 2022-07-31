import { AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, forwardRef, HostBinding, HostListener, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectCurrentDirective } from '../select-current.directive';
import { SelectOptionComponent } from '../select-option/select-option.component';

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
export class SelectComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  @ContentChild(SelectCurrentDirective, { static: true }) currentTemplateDirective: SelectCurrentDirective;
  @ContentChildren(SelectOptionComponent) options: QueryList<SelectOptionComponent>;
  
  @HostBinding('class.dropdown-open') protected isDropdownOpen = false;

  private optionSelectSubscriptions: Subscription[] = [];
  private optionListSubscription: Subscription;
  private keyboardSelectionIndex = null;
  
  protected internalValue;
  
  blur$: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(public elemenetRef: ElementRef<HTMLInputElement>) {
    this.elemenetRef.nativeElement.setAttribute("tabindex", "0");
  }

  ngOnInit() {}
  
  ngAfterViewInit() {
    this.hookUpOptionSubcriptions();
    this.optionListSubscription = this.options.changes.subscribe(() => {
      this.hookUpOptionSubcriptions();
    });
  }

  ngOnDestroy() {
    this.clearOptionSelectSubcriptions();
    this.optionListSubscription.unsubscribe();
  }

  @HostListener('blur')
  blurHandler() {
    this.onTouch();
    this.blur$.next();
    this.closeDropdown();
  }

  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "ArrowDown") this.handleMoveKeyboardSelection("DOWN");
    if (event.key === "ArrowUp") this.handleMoveKeyboardSelection("UP");
    
    if (event.key === "Enter") {

      if (!this.isDropdownOpen) {
        this.openDropdown();
        return;
      }

      if (this.isDropdownOpen && this.keyboardSelectionIndex === null) {
        this.closeDropdown();
        return;
      }

      if (this.isDropdownOpen && this.keyboardSelectionIndex !== null) {
        const value = this.options.toArray()[this.keyboardSelectionIndex].value;
        this.selectValue(value);
        this.closeDropdown();
        return;
      }

    }
  }

  selectValue(value) {
    this.internalValue = value;
    this.onChange(value);
    this.onTouch(value);
  }

  get valueIsDefined() {
    return !!this.internalValue && typeof this.internalValue !== 'boolean';
  }

  get selectedValueTemplate(): TemplateRef<any> {
    if (this.currentTemplateDirective) {
      return this.currentTemplateDirective.templateRef;
    } else {
      return null;
    }
  }

  onChange: any = () => {}

  onTouch: any = () => {}

  writeValue(value: any){ 
    this.internalValue = value;
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouch = fn;
  }

  protected displayClickHandler() {
    if (this.isDropdownOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
    this.elemenetRef.nativeElement.focus();
  }

  private clearOptionSelectSubcriptions() {
    this.optionSelectSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  private hookUpOptionSubcriptions() {
    this.clearOptionSelectSubcriptions();
    this.optionSelectSubscriptions = this.options.map(option => {
      return option.selected.subscribe(value => {
        this.selectValue(value);
        this.closeDropdown();
      });
    });
  }

  private openDropdown() {
    this.isDropdownOpen = true;
  }

  private closeDropdown() {
    this.isDropdownOpen = false;
    this.setKeyboardSelection(null);
  }

  private setKeyboardSelection(index) {
    this.keyboardSelectionIndex = index;
    this.options.forEach((option, optionIndex) => {
      option.isKeyboardSelection = index === optionIndex;
    });
  }

  private handleMoveKeyboardSelection(direction: "UP" | "DOWN") {
    const up = direction === "UP";
    const down = direction === "DOWN";
    const numberOfOptions = this.options.length;
    const lastIndex = numberOfOptions - 1;
    const currentIndex = this.keyboardSelectionIndex;

    if (!this.isDropdownOpen && down) {
      this.openDropdown();
      return;
    }

    if (!this.isDropdownOpen && up) {
      return;
    }

    if (currentIndex === null) {
      this.setKeyboardSelection(down ? 0 : lastIndex);
      return;
    }

    if (up) {
      const negativeOverflow = currentIndex <= 0;
      this.setKeyboardSelection(negativeOverflow ? lastIndex : currentIndex - 1);
      return;
    }
    
    if (down) {
      const positiveOverflow = currentIndex === lastIndex;
      this.setKeyboardSelection(positiveOverflow ? 0 : currentIndex + 1);
      return;
    }
  }

}
