/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataloadService } from './dataload.service';

describe('Service: Dataload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataloadService]
    });
  });

  it('should ...', inject([DataloadService], (service: DataloadService) => {
    expect(service).toBeTruthy();
  }));
});
