import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-currently-reading',
  templateUrl: './currently-reading.component.html',
  styleUrls: ['./currently-reading.component.scss'],
})
export class CurrentlyReadingComponent implements OnInit {
  constructor(private dbService: DbService) {}

  public jackCurrentBook!: Book;
  public leilaCurrentBook!: Book;

  ngOnInit() {
    this.dbService.getBookById(1).subscribe((book) => {
      this.jackCurrentBook = book;
    });
    this.dbService.getBookById(3).subscribe((book) => {
      this.leilaCurrentBook = book;
    });
  }
}
