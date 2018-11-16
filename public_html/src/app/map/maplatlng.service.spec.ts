import { TestBed, inject } from '@angular/core/testing';

import { MaplatlngService } from './maplatlng.service';

describe('MaplatlngService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaplatlngService]
    });
  });

  it('should be created', inject([MaplatlngService], (service: MaplatlngService) => {
    expect(service).toBeTruthy();
  }));
});
