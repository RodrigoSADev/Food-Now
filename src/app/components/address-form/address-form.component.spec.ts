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

  it('should render form fields correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cepInput = compiled.querySelector('input[formControlName="cep"]');
    const cityInput = compiled.querySelector('input[formControlName="city"]');
    const neighborhoodInput = compiled.querySelector(
      'input[formControlName="neighborhood"]'
    );
    const streetInput = compiled.querySelector(
      'input[formControlName="street"]'
    );
    const numberInput = compiled.querySelector(
      'input[formControlName="number"]'
    );
    const complementInput = compiled.querySelector(
      'input[formControlName="complement"]'
    );
    const saveAddressCheckbox = compiled.querySelector(
      'input[formControlName="saveAddress"]'
    );

    expect(cepInput).toBeTruthy();
    expect(cityInput).toBeTruthy();
    expect(neighborhoodInput).toBeTruthy();
    expect(streetInput).toBeTruthy();
    expect(numberInput).toBeTruthy();
    expect(complementInput).toBeTruthy();
    expect(saveAddressCheckbox).toBeTruthy();
  });

  it('should display the correct labels for form fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cepLabel = compiled.querySelector('label[for="floatingCep"]');
    const cityLabel = compiled.querySelector('label[for="floatingCity"]');
    const neighborhoodLabel = compiled.querySelector(
      'label[for="floatingNeighborhood"]'
    );
    const streetLabel = compiled.querySelector('label[for="flotingStreet"]');
    const numberLabel = compiled.querySelector('label[for="floatingNumber"]');
    const complementLabel = compiled.querySelector(
      'label[for="floatingComplement"]'
    );

    expect(cepLabel?.textContent).toContain('CEP');
    expect(cityLabel?.textContent).toContain('Cidade');
    expect(neighborhoodLabel?.textContent).toContain('Bairro');
    expect(streetLabel?.textContent).toContain('Rua');
    expect(numberLabel?.textContent).toContain('Número');
    expect(complementLabel?.textContent).toContain('Complemento');
  });

  it('should display an error message if address is invalid', () => {
    checkoutService.showAddressErrorMessage.set(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const errorMessage = compiled.querySelector(
      '[data-test="address-error-message"]'
    );
    expect(errorMessage).toBeTruthy();
    expect(errorMessage?.textContent).toContain(
      'Por favor, preencha todos os campos obrigatórios do endereço.'
    );
  });
});
