import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[pctSelectOption]'
})
export class SelectOptionDirective {

  constructor(public templateRef: TemplateRef<any>) {}

}
