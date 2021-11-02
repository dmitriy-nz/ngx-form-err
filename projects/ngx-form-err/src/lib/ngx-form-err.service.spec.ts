import { TestBed } from '@angular/core/testing';

import { NgxFormErrService } from './ngx-form-err.service';

describe('NgxFormErrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFormErrService = TestBed.get(NgxFormErrService);
    expect(service).toBeTruthy();
  });
});
