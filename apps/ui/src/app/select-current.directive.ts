import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[pctSelectCurrent]'
})
export class SelectCurrentDirective {

  constructor(public templateRef: TemplateRef<any>) {}

}
