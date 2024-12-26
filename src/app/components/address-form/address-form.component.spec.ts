import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CepService } from '../../services/cep.service';
import { CheckoutService } from '../../services/checkout.service';
import { AddressFormComponent } from './address-form.component';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let cepServiceMock: jest.Mocked<CepService>;
  let checkoutService: CheckoutService;

  beforeEach(async () => {
    cepServiceMock = {
      searchCep: jest.fn().mockReturnValue(
        of({
          localidade: 'City',
          bairro: 'Neighborhood',
          logradouro: 'Street',
        })
      ),
    } as unknown as jest.Mocked<CepService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddressFormComponent],
      providers: [
        { provide: CepService, useValue: cepServiceMock },
        CheckoutService,
      ],
    }).compileComponents();

    checkoutService = TestBed.inject(CheckoutService);
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formValues = component.addressForm.value;
    expect(formValues).toEqual({
      cep: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',
      saveAddress: false,
    });
  });

  it('should save address to localStorage when saveAddress is checked', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    component.addressForm.patchValue({
      cep: '12345678',
      city: 'City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      number: '123',
      complement: 'Apt 1',
      saveAddress: true,
    });
    component.saveAddressToLocalStorage();
    expect(spy).toHaveBeenCalledWith(
      'savedAddress',
      JSON.stringify({
        cep: '12345678',
        city: 'City',
        neighborhood: 'Neighborhood',
        street: 'Street',
        number: '123',
        complement: 'Apt 1',
      })
    );
  });

  it('should call cepService.searchCep and update form fields on valid cep', () => {
    component.addressForm.patchValue({ cep: '12345678' });
    component.onBlurCep();
    expect(cepServiceMock.searchCep).toHaveBeenCalledWith('12345678');
    expect(component.addressForm.get('city')?.value).toBe('City');
    expect(component.addressForm.get('neighborhood')?.value).toBe(
      'Neighborhood'
    );
    expect(component.addressForm.get('street')?.value).toBe('Street');
  });

  it('should call checkoutService.setAddress on form value change', () => {
    const spy = jest.spyOn(checkoutService, 'setAddress');
    component.addressForm.patchValue({ city: 'New City' });
    component.onUpdateAddress();
    expect(spy).toHaveBeenCalledWith(component.addressForm.value);
  });

  it('should show address error message if form is invalid', () => {
    component.addressForm.patchValue({ cep: '' });
    component.onUpdateAddress();
    expect(checkoutService.showAddressErrorMessage()).toBe(true);
  });

  it('should hide address error message if form is valid', () => {
    component.addressForm.patchValue({
      cep: '12345678',
      city: 'City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      number: '123',
    });
    component.onUpdateAddress();
    expect(checkoutService.showAddressErrorMessage()).toBe(false);
  });
});
