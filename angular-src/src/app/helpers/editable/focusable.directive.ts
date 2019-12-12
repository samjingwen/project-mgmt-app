import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFocusable]'
})
export class FocusableDirective implements AfterViewInit{

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }

}
