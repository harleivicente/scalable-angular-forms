import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Directive({
  selector: 'input[pctTextInput]'
})
export class TextInputDirective implements OnInit {
  private blur$: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  private css = `
    width: 100%;
    line-height: 24px;
    padding: 3px;
  `;

  constructor(public elemenetRef: ElementRef<HTMLInputElement>) {}

  @HostListener('blur')
  blurHandler() {
    this.blur$.next();
  }

  ngOnInit() {
    this.elemenetRef.nativeElement.setAttribute("style", this.css);
  }

}
