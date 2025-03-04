import { TestBed } from '@angular/core/testing';

import { RedireccionamientoService } from './redireccionamiento.service';

describe('RedireccionamientoService', () => {
  let service: RedireccionamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedireccionamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
