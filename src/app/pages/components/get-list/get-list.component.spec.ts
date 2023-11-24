import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetListComponent } from './get-list.component';

describe('GetListComponent', () => {
  let component: GetListComponent;
  let fixture: ComponentFixture<GetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetListComponent]
    });
    fixture = TestBed.createComponent(GetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
