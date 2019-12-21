import { TestBed } from '@angular/core/testing';

import { ShopServiceService } from './shop-service.service';

describe('ShopServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopServiceService = TestBed.get(ShopServiceService);
    expect(service).toBeTruthy();
  });
});
