import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import ColorThief from '@neutrixs/colorthief';
import { DbServiceService } from 'src/app/services/db-service.service';
import { ColorServiceService } from 'src/app/services/color-service/color-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  public book!: Book;
  public colorThief: ColorThief;
  public bookId: number = 0;
  public imageLoading = false;
  public appearFromLeft: boolean = true;
  @ViewChild('coverImage') coverImgElement!: ElementRef;
  @ViewChild('leftArrow') leftArrowElement!: ElementRef;
  @ViewChild('rightArrow') rightArrowElement!: ElementRef;
  @ViewChild('bookDisplay') bookDisplayElement!: ElementRef;
  @ViewChild('detailsDisplay') detailsDisplayElement!: ElementRef;

  public animationClasses = [
    'slide-offscreen-left',
    'slide-offscreen-right',
    'slide-onscreen-left',
    'slide-onscreen-right',
  ];

  constructor(
    private dbService: DbServiceService,
    public colorService: ColorServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.colorThief = new ColorThief();
    this.bookId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('id') ?? ''
    );
  }

  public ngOnInit(): void {
    this.updateBookInfo();
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      console.log(event);
      if (event.key === 'ArrowLeft') {
        this.prevBook();
        return;
      } else if (event.key === 'ArrowRight') {
        this.nextBook();
        return;
      }
      // do something
    });
  }

  public updateBookInfo(): void {
    this.imageLoading = true;
    this.dbService.getBookById(this.bookId).subscribe((res) => {
      this.book = res;
    });
  }

  public onImageLoad(): void {
    const palette = this.colorThief.getPalette(
      this.coverImgElement.nativeElement
    );
    this.colorService.setColorPalette(palette);
    this.imageLoading = false;
    this.triggerAnimationOnElement(
      this.bookDisplayElement.nativeElement,
      this.appearFromLeft ? 'slide-onscreen-right' : 'slide-onscreen-left'
    );
    this.triggerAnimationOnElement(
      this.detailsDisplayElement.nativeElement,
      this.appearFromLeft ? 'slide-onscreen-right' : 'slide-onscreen-left'
    );
  }

  public get owner(): string {
    const name =
      this.book.owner === 'J'
        ? 'Jack'
        : this.book.owner === 'L'
        ? 'Leila'
        : this.book.owner;
    return name;
  }

  public get fictionOrNonFiction(): string {
    return this.book.fiction ? 'Fiction' : 'Non-Fiction';
  }

  public get coverSource(): string {
    return this.book
      ? `https://covers.openlibrary.org/b/isbn/${this.book.ISBN}-L.jpg`
      : '';
  }

  public nextBook(): void {
    this.triggerAnimationOnElement(
      this.rightArrowElement.nativeElement,
      'shift-right-animation'
    );
    this.triggerAnimationOnElement(
      this.bookDisplayElement.nativeElement,
      'slide-offscreen-left'
    );
    this.triggerAnimationOnElement(
      this.detailsDisplayElement.nativeElement,
      'slide-offscreen-left'
    );
    this.appearFromLeft = true;
    this.bookId += 1;
    this.router.navigateByUrl(`/book/${this.bookId}`);
    this.updateBookInfo();
  }

  public prevBook(): void {
    this.triggerAnimationOnElement(
      this.leftArrowElement.nativeElement,
      'shift-left-animation'
    );
    this.triggerAnimationOnElement(
      this.bookDisplayElement.nativeElement,
      'slide-offscreen-right'
    );
    this.triggerAnimationOnElement(
      this.detailsDisplayElement.nativeElement,
      'slide-offscreen-right'
    );
    this.appearFromLeft = false;
    this.bookId -= 1;
    this.router.navigateByUrl(`/book/${this.bookId}`);
    this.updateBookInfo();
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
