import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appManipularVideo]',
})
export class ManipularVideoDirective {
  constructor(private elemento: ElementRef) {
    console.log(elemento.nativeElement.parentElement);
  }
}
