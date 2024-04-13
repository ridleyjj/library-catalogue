import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBrowseComponent } from './category-browse.component';

describe('CategoryBrowseComponent', () => {
  let component: CategoryBrowseComponent;
  let fixture: ComponentFixture<CategoryBrowseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryBrowseComponent]
    });
    fixture = TestBed.createComponent(CategoryBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
