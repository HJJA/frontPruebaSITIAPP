import { TestBed } from '@angular/core/testing';

import { TiposIdentificacionesService } from './tipos-identificaciones.service';

describe('TiposIdentificacionesService', () => {
  let service: TiposIdentificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposIdentificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
