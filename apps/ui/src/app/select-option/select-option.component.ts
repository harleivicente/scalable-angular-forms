import { Component, EventEmitter, HostListener, Input, OnInit, Optional, Output } from '@angular/core';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'pct-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit {
  @Input() value: any;

  @HostListener('click')
  private clickHandler() {
    this.select.selectOption(this.value);
  }

  constructor(@Optional() private  select: SelectComponent) {}

  ngOnInit() {}

}
