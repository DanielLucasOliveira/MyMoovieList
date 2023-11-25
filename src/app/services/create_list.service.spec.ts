import { TestBed } from '@angular/core/testing';

import { CreateListService } from './create_list.service';

describe('CreateListService', () => {
  let service: CreateListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
