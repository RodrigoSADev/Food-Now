import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ICep } from '../interfaces/cep.interface';
import { CepService } from './cep.service';

describe('CepService', () => {
  let service: CepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch CEP data', () => {
    const mockCepData: ICep = {
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
    };

    service.searchCep('01001000').subscribe((data) => {
      expect(data).toEqual(mockCepData);
    });

    const req = httpMock.expectOne('https://viacep.com.br/ws/01001000/json/');
    expect(req.request.method).toBe('GET');
    req.flush(mockCepData);
  });
});
