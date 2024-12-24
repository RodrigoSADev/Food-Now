import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CepService } from './cep.service';

describe('CepService', () => {
  let service: CepService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
