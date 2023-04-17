import { TestBed } from '@angular/core/testing';

import { ServicioPokemon } from './servicio.service';

describe('ServicioPokemon', () => {
  let service: ServicioPokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPokemon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
