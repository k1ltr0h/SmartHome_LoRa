import { TestBed } from '@angular/core/testing';

import { LightService } from './light.service';

describe('LightServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LightService = TestBed.get(LightService);
    expect(service).toBeTruthy();
  });
});
