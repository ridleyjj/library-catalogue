import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { ColorService } from 'src/app/services/color-service/color-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDisplayComponent } from '../book-display/book-display.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements AfterViewInit {
  public bookId: number = 0;
  public imageLoading = false; // checks for when new book info should be brought in
  public appearFromLeft: boolean = true;
  public isPrimaryDisplayActive = true;
  public isAnimationInProgress = false;
  private initialised = false;
  public previousBookId = -1;
  @ViewChild('bookDisplay1') primaryBookDisplayElement!: BookDisplayComponent;
  @ViewChild('bookDisplay2') secondaryBookDisplayElement!: BookDisplayComponent;
  @ViewChild('leftArrow') leftArrowElement!: ElementRef;
  @ViewChild('rightArrow') rightArrowElement!: ElementRef;

  public animationClasses = [
    'slide-offscreen-left',
    'slide-offscreen-right',
    'slide-onscreen-left',
    'slide-onscreen-right',
  ];

  public get activeBookDisplay(): BookDisplayComponent {
    return this.isPrimaryDisplayActive
      ? this.primaryBookDisplayElement
      : this.secondaryBookDisplayElement;
  }
  public get inactiveBookDisplay(): BookDisplayComponent {
    return this.isPrimaryDisplayActive
      ? this.secondaryBookDisplayElement
      : this.primaryBookDisplayElement;
  }

  constructor(
    private dbService: DbService,
    public colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.bookId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('id') ?? ''
    );
  }

  public ngAfterViewInit(): void {
    this.updateBookInfo(this.activeBookDisplay);
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (!this.isAnimationInProgress) {
        if (event.key === 'ArrowLeft') {
          this.switchBook(false);
          return;
        } else if (event.key === 'ArrowRight') {
          this.switchBook(true);
          return;
        }
      }
    });
  }

  public updateBookInfo(bookDisplay: BookDisplayComponent): void {
    bookDisplay.imageLoading = true;
    this.dbService.getBookById(this.bookId).subscribe((res) => {
      bookDisplay.book = res;
    });
  }

  public onImageLoad(): void {
    this.imageLoading = false;
    if (!this.initialised) {
      this.initialised = true;
    } else {
      this.swapDisplays();
    }
  }

  private swapDisplays() {
    if (!this.isAnimationInProgress && !this.imageLoading) {
      this.inactiveBookDisplay.slide(true, !this.appearFromLeft);
      this.isAnimationInProgress = true;
      setTimeout(this.endAnimation.bind(this), 550);
      this.isPrimaryDisplayActive = !this.isPrimaryDisplayActive;
    }
  }

  /**
   * changes displayed book by either increasing the bookId by 1 or decreasing the bookId by 1
   * @param next boolean, is the user moving to the next book by id (true) or the previous book by id (false)
   */
  public switchBook(next: boolean): void {
    if (this.isAnimationInProgress || this.imageLoading) return;
    this.triggerAnimationOnElement(
      this.rightArrowElement.nativeElement,
      `shift-${next ? 'right' : 'left'}-animation`
    );
    this.activeBookDisplay.slide(false, next);
    this.isAnimationInProgress = true;
    this.appearFromLeft = next;
    this.bookId += next ? 1 : -1;
    // for testing
    this.bookId > 4 && (this.bookId = 1);
    this.bookId < 1 && (this.bookId = 4);
    // testing code over
    this.imageLoading = this.bookId !== this.previousBookId;
    this.previousBookId = this.bookId - (next ? 1 : -1);
    setTimeout(this.animationCallback.bind(this), 800);
    this.router.navigateByUrl(`/book/${this.bookId}`);
    this.updateBookInfo(this.inactiveBookDisplay);
  }

  private animationCallback(): void {
    this.endAnimation();
    this.swapDisplays();
  }

  private endAnimation(): void {
    this.isAnimationInProgress = false;
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
