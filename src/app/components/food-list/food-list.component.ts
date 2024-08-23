import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FoodData, FoodItem } from 'src/app/interfaces/food.interface';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss',
})
export class FoodListComponent implements OnInit {
  currentFoods: FoodItem[] = [];
  allFoods: FoodData | undefined;
  isLoading = true;
  currentFoodType: string | undefined;

  actRoute = inject(ActivatedRoute);
  foodService = inject(FoodService);
  cartService = inject(CartService);

  ngOnInit(): void {
    this.foodService.getFoods().subscribe({
      next: (data: FoodData) => {
        this.allFoods = data;
        this.actRoute.url.subscribe((urlSegment) => {
          this.currentFoodType = urlSegment[0].path;
          const foodType = urlSegment[0].path as keyof FoodData;
          this.currentFoods = this.allFoods
            ? this.allFoods[foodType] || []
            : [];
        });
      },
      error: (error) => {
        console.error('Erro ao carregar os dados:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  addToCart(food: FoodItem): void {
    this.cartService.addToCart(food);
    Swal.fire({
      toast: true,
      position: 'top-end',
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
