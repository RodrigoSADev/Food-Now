import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { IFoodData, IFoodItem } from '../../interfaces/food.interface';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-food-list',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss',
})
export class FoodListComponent implements OnInit {
  actRoute = inject(ActivatedRoute);
  foodService = inject(FoodService);
  cartService = inject(CartService);

  allFoods = signal<IFoodData | null>(null);
  currentFood = signal<IFoodItem[] | null>(null);
  currentFoodType = signal<string | null>(null);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(): void {
    this.foodService
      .getFoods()
      .pipe(
        switchMap((response) => {
          this.allFoods.set(response);
          return this.actRoute.url;
        }),
        map((urlSegment) => {
          this.currentFoodType.set(urlSegment[0].path);
          const foodType = urlSegment[0].path as keyof IFoodData;
          const allFoodsValue = this.allFoods();
          this.currentFood.set(
            allFoodsValue ? allFoodsValue[foodType] || [] : []
          );
          this.isLoading.set(false);
        }),
        catchError(() => {
          this.hasError.set(true);
          this.isLoading.set(false);
          return of(null);
        })
      )
      .subscribe();
  }

  onAdd(food: IFoodItem): void {
    this.cartService.addToCart(food);
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Adicionado ao carrinho!',
      text: `${food.name} adicionado com sucesso!`,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
