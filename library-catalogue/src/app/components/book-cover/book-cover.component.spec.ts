import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCoverComponent } from './book-cover.component';

describe('BookCoverComponent', () => {
  let component: BookCoverComponent;
  let fixture: ComponentFixture<BookCoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCoverComponent]
    });
    fixture = TestBed.createComponent(BookCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
