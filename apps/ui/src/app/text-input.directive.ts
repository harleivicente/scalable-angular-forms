import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Directive({
  selector: 'input[pctTextInput]'
})
export class TextInputDirective implements OnInit {
  private observer: Observer<void>;
  blur$: Observable<void> = new Observable(observer => {
    this.observer = observer;
  });

  private css = `
    width: 100%;
    line-height: 24px;
    padding: 3px;
  `;

  constructor(public elemenetRef: ElementRef<HTMLInputElement>) {}

  @HostListener('blur')
  blurHandler() {
    this.observer.next();
  }

  ngOnInit() {
    this.elemenetRef.nativeElement.setAttribute("style", this.css);
  }

}
