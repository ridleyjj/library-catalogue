import { Directive, ElementRef, Input } from '@angular/core';
import { ColorServiceService } from '../services/color-service/color-service.service';

@Directive({
  selector: '[appColorPalette]',
})
export class ColorPaletteDirective {
  @Input() set backgroundColorIndex(value: string) {
    this._backgroundColorIndex = parseInt(value);
  }
  @Input() set colorIndex(value: string) {
    this._colorIndex = parseInt(value);
  }
  @Input() set borderColorIndex(value: string) {
    this._borderColorIndex = parseInt(value);
  }
  public _backgroundColorIndex: number = -1;
  public _colorIndex: number = -1;
  public _borderColorIndex: number = -1;

  constructor(
    private el: ElementRef,
    private colorService: ColorServiceService
  ) {
    this.colorService.colorPalette$.subscribe((palette) => {
      if (this._backgroundColorIndex >= 0) {
        this.setBackgroundColor(palette[this._backgroundColorIndex] ?? 'white');
      }
      if (this._colorIndex >= 0) {
        this.setColor(palette[this._colorIndex] ?? 'white');
      }
      if (this._borderColorIndex >= 0) {
        this.setBorderColor(palette[this._borderColorIndex] ?? 'white');
      }
    });
  }

  public setBackgroundColor(newColor: string): void {
    this.el.nativeElement.style.backgroundColor = newColor;
  }

  public setColor(newColor: string): void {
    this.el.nativeElement.style.color = newColor;
  }

  public setBorderColor(newColor: string): void {
    this.el.nativeElement.style.borderColor = newColor;
  }
}
