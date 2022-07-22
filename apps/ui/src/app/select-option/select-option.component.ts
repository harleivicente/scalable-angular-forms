import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Optional, Output } from '@angular/core';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'pct-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit, OnDestroy {
  @Input() value: any;
  protected optionIndex = null;
  protected isKeyboardSelection = false;

  @HostListener('click')
  protected clickHandler() {
    this.select.selectOption(this.value);
  }

  constructor(
    @Optional() private select: SelectComponent,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    if (this.select) {
      this.select.incrementOptionCount();
    }

    // Set option index
    const self = this.elementRef.nativeElement;
    const parent = self.parentElement;
    if (!parent) return null;
    this.optionIndex = Array.prototype.indexOf.call(parent.children, self);

    this.select.keyboardSelectionIndex.subscribe(selectedIndex => {
      this.isKeyboardSelection = this.optionIndex === selectedIndex;
    });

  }

  ngOnDestroy() {
    if (this.select) {
      this.select.decreaseOptionCount();
    }
  }

}
