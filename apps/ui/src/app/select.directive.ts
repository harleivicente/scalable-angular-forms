import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Directive({
  selector: '[pctSelect]'
})
export class SelectDirective implements OnInit {
  blur$: Subject<void> = new Subject();

  private css = `
    height: 34px;
    width: 100%;
  `;

  constructor(public elemenetRef: ElementRef<HTMLSelectElement>) {}

  @HostListener('blur')
  blurHandler() {
    this.blur$.next();
  }

  ngOnInit() {
    this.elemenetRef.nativeElement.setAttribute("style", this.css);
  }

}
