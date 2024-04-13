import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-book-cover',
  templateUrl: './book-cover.component.html',
  styleUrls: ['./book-cover.component.scss'],
})
export class BookCoverComponent implements AfterViewInit, OnInit {
  @Input() public ISBN!: string;
  @Input() public title: string = '';
  @Input() public size = 'L';
  @Input() public clickable = false;
  @HostBinding('style.min-width') minWidth = '325px;';
  @HostBinding('style.min-height') minHeight = '500px';
  @ViewChild('spinner') spinnerElement!: ElementRef;
  @ViewChild('coverImage') coverElement!: ElementRef;
  get url(): string {
    return this.ISBN
      ? `https://covers.openlibrary.org/b/isbn/${this.ISBN}-${this.size}.jpg`
      : '';
  }
  public imageLoading = true;

  ngOnInit() {
    this.minWidth =
      this.size === 'L' ? '325px' : this.size === 'M' ? '180px' : '37px';
    this.minHeight =
      this.size === 'L' ? '500px' : this.size === 'M' ? '276px' : '58px';
  }

  ngAfterViewInit() {
    this.spinnerElement.nativeElement.style.fontSize =
      this.size === 'L' ? '4rem' : this.size === 'M' ? '2.5rem' : '1rem';
    console.log(this.coverElement.nativeElement.classList);
    this.coverElement.nativeElement.classList.add(
      this.clickable ? 'clickable-cover' : ''
    );
  }

  public onImageLoad() {
    this.imageLoading = false;
  }
}
