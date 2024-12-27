import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IFoodData } from '../interfaces/food.interface';
import { FoodService } from './food.service';

describe('FoodService', () => {
  let service: FoodService;
  let httpMock: HttpTestingController;

  const mockFoodData: IFoodData = {
    hamburguer: [
      {
        id: 1,
        name: 'X-Bacon',
        description: 'Pão, hambúrguer, bacon, queijo, alface e tomate.',
        price: 20,
        image: '',
        alt: '',
      },
    ],
    pizza: [
      {
        id: 1,
        name: 'Calabresa',
        description: 'Molho, queijo, calabresa, cebola e azeitona.',
        price: 30,
        image: '',
        alt: '',
      },
    ],
    bebidas: [
      {
        id: 1,
        name: 'Coca-cola',
        description: 'Lata 350ml',
        price: 5,
        image: '',
        alt: '',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(FoodService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch food data from primary API', () => {
    service.getFoods().subscribe((data) => {
      expect(data).toEqual(mockFoodData);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockFoodData);
  });

  it('should fallback to backup API if primary API fails', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    service.getFoods().subscribe((data) => {
      expect(data).toEqual(mockFoodData);
    });

    const primaryReq = httpMock.expectOne(service['apiUrl']);
    primaryReq.flush('Error', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    const backupReq = httpMock.expectOne(service['apiUrlBackup']);
    expect(backupReq.request.method).toBe('GET');
    backupReq.flush(mockFoodData);

    consoleSpy.mockRestore();
  });
});
