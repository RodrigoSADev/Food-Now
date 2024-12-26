import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { IFoodData, IFoodItem } from '../../interfaces/food.interface';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';
import { FoodListComponent } from './food-list.component';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('FoodListComponent', () => {
  let component: FoodListComponent;
  let fixture: ComponentFixture<FoodListComponent>;
  let foodServiceMock: jest.Mocked<FoodService>;
  let cartServiceMock: jest.Mocked<CartService>;

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
        id: 2,
        name: 'Calabresa',
        description: 'Molho, queijo, calabresa, cebola e azeitona.',
        price: 30,
        image: '',
        alt: '',
      },
    ],
    bebidas: [
      {
        id: 3,
        name: 'Coca-cola',
        description: 'Lata 350ml',
        price: 5,
        image: '',
        alt: '',
      },
    ],
  };

  beforeEach(async () => {
    foodServiceMock = {
      getFoods: jest.fn().mockReturnValue(of(mockFoodData)),
    } as unknown as jest.Mocked<FoodService>;

    cartServiceMock = {
      addToCart: jest.fn(),
    } as unknown as jest.Mocked<CartService>;

    await TestBed.configureTestingModule({
      imports: [FoodListComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: FoodService, useValue: foodServiceMock },
        { provide: CartService, useValue: cartServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load foods on init', () => {
    component.ngOnInit();
    expect(foodServiceMock.getFoods).toHaveBeenCalled();
    expect(component.allFoods()).toEqual(mockFoodData);
  });

  it('should handle error when loading foods', () => {
    foodServiceMock.getFoods.mockReturnValueOnce(
      throwError(() => new Error('Error'))
    );
    component.loadFoods();
    expect(component.hasError()).toBe(true);
    expect(component.isLoading()).toBe(false);
  });

  it('should add food to cart', () => {
    const foodItem: IFoodItem = mockFoodData.hamburguer[0];
    component.onAdd(foodItem);
    expect(cartServiceMock.addToCart).toHaveBeenCalledWith(foodItem);
    expect(Swal.fire).toHaveBeenCalledWith({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Adicionado ao carrinho!',
      text: `${foodItem.name} adicionado com sucesso!`,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
    });
  });

  it('should render buttons to filter foods', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('[data-test="food-list-button"]');
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toContain('Hamburguer');
    expect(buttons[1].textContent).toContain('Pizza');
    expect(buttons[2].textContent).toContain('Bebidas');
  });

  it('should render food items', () => {
    component.currentFood.set(mockFoodData.hamburguer);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const foodCards = compiled.querySelectorAll(
      '[ data-test="food-list-card"]'
    );
    expect(foodCards.length).toBe(1);
    expect(
      compiled.querySelector('[data-test="food-list-card-title"]')?.textContent
    ).toContain('X-Bacon');
    expect(
      compiled.querySelector('[data-test="food-list-card-description"]')
        ?.textContent
    ).toContain('Pão, hambúrguer, bacon, queijo, alface e tomate.');
    expect(
      compiled.querySelector('[data-test="food-list-card-text"]')?.textContent
    ).toContain('R$20.00');
  });

  it('should show loading placeholder when loading', () => {
    component.isLoading.set(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="placeholder-title"]')
    ).toBeTruthy();
  });

  it('should show error message when there is an error', () => {
    component.hasError.set(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test="food-list-error-icon"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('[data-test="food-list-error-message"]')
        ?.textContent
    ).toContain(
      'Não foi possível carregar os dados. Tente novamente mais tarde.'
    );
  });
});
