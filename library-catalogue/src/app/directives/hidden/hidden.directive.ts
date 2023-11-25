import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHidden]',
})
export class HiddenDirective {
  @Input() set appHidden(isHidden: boolean) {
    this.el.nativeElement.style.color = isHidden ? 'transparent' : '';
    this.el.nativeElement.style.transition = `${
      isHidden ? 'opacity 0.2s' : 'opacity 3s'
    }`;
    this.el.nativeElement.style.opacity = isHidden ? '0' : '1';
  }

  constructor(private el: ElementRef) {}
}
