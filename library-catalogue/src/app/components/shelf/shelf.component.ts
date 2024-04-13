import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorService } from 'src/app/services/color-service/color-service.service';
import { CartoonBook } from './shelf.component.constants';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss'],
})
export class ShelfComponent implements OnInit {
  public booksLeft: CartoonBook[] = [];
  public booksRight: CartoonBook[] = [];
  public colorPalette: string[] = [];
  private minBookWidth = 1.5;
  private bookWidthRange = 1.5;
  public titleColor = '';
  @Input() public title: string = '';
  @Input() public titleColorIndex!: number;
  @Output() public shelfClick: EventEmitter<void> = new EventEmitter();

  constructor(private colorService: ColorService) {}

  ngOnInit() {
    this.colorService.colorPalette$.subscribe((colors) => {
      this.colorPalette = colors;
      this.setTitleColor();
    });

    this.fillBookShelf(this.booksLeft);
    this.fillBookShelf(this.booksRight);
  }

  public setTitleColor(): void {
    this.titleColor = this.titleColorIndex
      ? this.colorPalette[this.titleColorIndex]
      : this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
  }

  public fillBookShelf(books: CartoonBook[]): void {
    let totalWidth = 0;
    while (totalWidth < 100) {
      const seed = Math.random();
      let w = this.minBookWidth + this.bookWidthRange * seed;
      if (totalWidth + w > 100) {
        totalWidth = 100;
      } else {
        const h = 60 + Math.random() * 30;
        books.push({
          width: `${w}%`,
          colorIndex: Math.floor(Math.random() * 8),
          height: h,
        });
        totalWidth += w;
      }
    }
  }

  public animateBooks(): void {
    this.bookWave(this.booksLeft, true);
    this.bookWave(this.booksRight, false);
  }

  private bookWave(books: CartoonBook[], backwards?: boolean): void {
    const heightChange = 15;
    const intervalBaseMs = 10;
    for (
      let i = backwards ? books.length - 1 : 0;
      backwards ? i >= 0 : i < books.length;
      backwards ? i-- : i++
    ) {
      const timingsIndex = backwards ? books.length - i : i;
      const updatedBook = { ...books[i] };
      setTimeout(() => {
        const updatedHeight = updatedBook.height + heightChange;
        updatedBook.height = updatedHeight > 100 ? 100 : updatedHeight;
        books[i] = updatedBook;
        setTimeout(() => {
          updatedBook.height -= heightChange;
          books[i] = updatedBook;
        }, (intervalBaseMs / 6) * timingsIndex);
      }, intervalBaseMs * timingsIndex);
    }
  }

  public onShelfClick(): void {
    this.shelfClick.emit();
  }
}
