import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbServiceService {
  constructor() {}

  books: Map<number, Book> = new Map<number, Book>([
    [
      1,
      {
        id: 1,
        title: 'The Book of Form and Emptiness',
        authors: ['Ruth Ozeki'],
        editors: ['Stanley Applebaum', 'Thomas Crofts'],
        publisher: 'Dover Publications',
        versionReleaseYear: '2021',
        originalReleaseYear: '2021',
        fiction: true,
        ISBN: '9781838855246',
        owner: 'J',
        readByJack: true,
        readByLeila: false,
        category: 'Novel',
        subCategories: [''],
      } as Book,
    ],
    [
      2,
      {
        id: 2,
        title: 'Lysistrata',
        authors: ['Aristophanes'],
        editors: ['Stanley Applebaum', 'Thomas Crofts'],
        publisher: 'Dover Publications',
        versionReleaseYear: '1994',
        originalReleaseYear: '411',
        fiction: true,
        ISBN: '0486282252',
        owner: 'L',
        readByJack: false,
        readByLeila: true,
        category: 'Script',
        subCategories: ['Play'],
        translators: ['Anonymous'],
        originalLanguage: 'Ancient Greek',
      } as Book,
    ],
    [
      3,
      {
        id: 3,
        title: 'I Am, I Am, I Am',
        authors: ["Maggie O'Farrell"],
        editors: [''],
        publisher: '',
        versionReleaseYear: '2017',
        originalReleaseYear: '2017',
        fiction: false,
        ISBN: '9780525436058',
        owner: 'L',
        readByJack: true,
        readByLeila: true,
        category: 'Memoir',
        subCategories: [''],
      } as Book,
    ],
    [
      4,
      {
        id: 4,
        title: 'The Catcher in the Rye',
        authors: ['J. D. Salinger'],
        editors: [''],
        publisher: '',
        versionReleaseYear: '1951',
        originalReleaseYear: '1951',
        fiction: true,
        ISBN: '9783462015393',
        owner: 'L',
        readByJack: true,
        readByLeila: true,
        category: 'Novel',
        subCategories: [''],
      } as Book,
    ],
  ]);

  public getBookById(id: number): Observable<Book> {
    return of(this.books.get(id) ?? ({} as any as Book));
  }
}
