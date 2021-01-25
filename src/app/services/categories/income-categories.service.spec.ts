import { TestBed } from '@angular/core/testing';

import { IncomeCategoriesService } from './income-categories.service';

describe('IncomeCategoriesService', () => {
  let service: IncomeCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
