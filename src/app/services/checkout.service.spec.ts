import { TestBed } from '@angular/core/testing';
import { IAddress } from '../interfaces/address.interface';
import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  const mockAddress: IAddress = {
    cep: '12345678',
    city: 'City',
    neighborhood: 'Neighborhood',
    street: 'Street',
    number: '123',
    complement: 'Apt 1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get payment method', () => {
    service.setPaymentMethod('credit_card');
    expect(service.paymentMethod()).toBe('credit_card');
  });

  it('should validate payment method', () => {
    service.setPaymentMethod('credit_card');
    expect(service.validatePayment()).toBe(true);
    service.setPaymentMethod('');
    expect(service.validatePayment()).toBe(false);
  });

  it('should set and get saved payment method', () => {
    service.setSavedPaymentMethod('credit_card');
    expect(service.getSavedPaymentMethod()).toBe('credit_card');
  });

  it('should set and get address', () => {
    service.setAddress(mockAddress);
    expect(service.getAddress()).toEqual(mockAddress);
  });

  it('should validate address', () => {
    service.setAddress(mockAddress);
    expect(service.validateAddress()).toBe(true);
    service.setAddress({
      cep: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',
    });
    expect(service.validateAddress()).toBe(false);
  });
});
