import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLargeBookComponent } from './simple-large-book.component';

describe('SimpleLargeBookComponent', () => {
  let component: SimpleLargeBookComponent;
  let fixture: ComponentFixture<SimpleLargeBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleLargeBookComponent]
    });
    fixture = TestBed.createComponent(SimpleLargeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
