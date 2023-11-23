import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSearchCardComponent } from './result-search-card.component';

describe('CardComponent', () => {
  let component: ResultSearchCardComponent;
  let fixture: ComponentFixture<ResultSearchCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultSearchCardComponent]
    });
    fixture = TestBed.createComponent(ResultSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
