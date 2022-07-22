import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pct-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit, OnDestroy {
  @Input() value: any;
  @Input() isKeyboardSelection = false;
  @Output() selected: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  protected clickHandler() {
    this.selected.next(this.value);
  }

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

}
