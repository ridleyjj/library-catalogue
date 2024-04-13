import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Book, EMPTY_BOOK } from 'src/app/models/book.model';
import { BookCoverComponent } from '../book-cover/book-cover.component';

@Component({
  selector: 'app-simple-large-book',
  templateUrl: './simple-large-book.component.html',
  styleUrls: ['./simple-large-book.component.scss'],
})
export class SimpleLargeBookComponent {
  @Input() public book: Book = EMPTY_BOOK;
  @ViewChild('cover') coverImage!: BookCoverComponent;

  public get imageLoading(): boolean {
    return this.coverImage ? this.coverImage.imageLoading : true;
  }
}
