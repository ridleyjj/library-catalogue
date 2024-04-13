import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  public colorPalette: string[] = [];
  public _colorPalette: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public colorPalette$: Observable<string[]> =
    this._colorPalette.asObservable();

  constructor() {}

  public setColorPalette(rgbArrays: number[][]): void {
    for (let i = 0; i < 8; i++) {
      this.colorPalette[i] =
        i < rgbArrays.length ? this.convertArrayToColor(rgbArrays[i]) : 'white';
    }
    this._colorPalette.next(this.colorPalette);
  }

  public convertArrayToColor(rgbArray: number[]): string {
    return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  }

  public setColorPaletteToWhite(): void {
    this._colorPalette.next([]);
  }
}
