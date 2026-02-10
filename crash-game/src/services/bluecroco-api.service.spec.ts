import { TestBed } from '@angular/core/testing';

import { BluecrocoApiService } from './bluecroco-api.service';

describe('BluecrocoApiService', () => {
  let service: BluecrocoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BluecrocoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
