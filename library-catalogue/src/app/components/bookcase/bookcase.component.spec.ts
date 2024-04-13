import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseComponent } from './bookcase.component';

describe('BookcaseComponent', () => {
  let component: BookcaseComponent;
  let fixture: ComponentFixture<BookcaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookcaseComponent]
    });
    fixture = TestBed.createComponent(BookcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
