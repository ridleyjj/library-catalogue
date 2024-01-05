import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import ColorThief, { color } from '@neutrixs/colorthief';
import { Book } from 'src/app/models/book.model';
import { ColorServiceService } from 'src/app/services/color-service/color-service.service';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.scss'],
})
export class BookDisplayComponent {
  public set book(newBook: Book) {
    if (newBook.id === this._book.id) {
      this.onReady();
    } else {
      this._book = newBook;
    }
  }
  protected _book: Book = {
    id: -1,
    title: '',
    authors: [],
    editors: [],
    publisher: '',
    versionReleaseYear: '',
    originalReleaseYear: '',
    fiction: false,
    ISBN: '',
    owner: '',
    readByJack: false,
    readByLeila: false,
  };
  public colorThief: ColorThief;
  private palette!: color[];
  public imageLoading = false; // controls spinner for book cover image
  @ViewChild('coverImage') coverImgElement!: ElementRef;
  @ViewChild('bookDisplay') bookDisplayElement!: ElementRef;
  @ViewChild('detailsDisplay') detailsDisplayElement!: ElementRef;
  @Output() onCoverImageLoad: EventEmitter<void> = new EventEmitter();

  public animationClasses = [
    'slide-offscreen-left',
    'slide-offscreen-right',
    'slide-onscreen-left',
    'slide-onscreen-right',
  ];

  constructor(public colorService: ColorServiceService) {
    this.colorThief = new ColorThief();
  }

  public onImageLoad(): void {
    this.palette = this.colorThief.getPalette(
      this.coverImgElement.nativeElement
    );
    this.onReady();
  }

  public onReady(): void {
    this.colorService.setColorPalette(this.palette);
    this.imageLoading = false;
    this.onCoverImageLoad.emit();
  }

  public get owner(): string {
    const name =
      this._book.owner === 'J'
        ? 'Jack'
        : this._book.owner === 'L'
        ? 'Leila'
        : this._book.owner;
    return name;
  }

  public get fictionOrNonFiction(): string {
    return this._book.fiction ? 'Fiction' : 'Non-Fiction';
  }

  public get coverSource(): string {
    return this._book
      ? `https://covers.openlibrary.org/b/isbn/${this._book.ISBN}-L.jpg`
      : '';
  }

  public slide(slideIn: boolean, left?: boolean): void {
    const animationClass = `slide-${slideIn ? 'onscreen' : 'offscreen'}-${
      left ? 'left' : 'right'
    }`;
    this.triggerAnimationOnElement(
      this.bookDisplayElement.nativeElement,
      animationClass
    );
    this.triggerAnimationOnElement(
      this.detailsDisplayElement.nativeElement,
      animationClass
    );
  }

  public triggerAnimationOnElement(
    element: HTMLElement,
    animationClass: string
  ): void {
    this.animationClasses.forEach((className) => {
      element.classList.remove(className);
    });
    element.classList.remove(animationClass);
    element.offsetWidth; // adds delay to allow animation to be reset
    element.classList.add(animationClass);
  }
}
