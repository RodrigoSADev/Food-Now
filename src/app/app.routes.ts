import { Route } from '@angular/router';
import { FoodListComponent } from './components/food-list/food-list.component';

export const appRoutes: Route[] = [
  { path: 'hamburguer', component: FoodListComponent },
  { path: 'pizza', component: FoodListComponent },
  { path: 'bebidas', component: FoodListComponent },
  { path: '', redirectTo: '/hamburguer', pathMatch: 'full' },
  {
    path: 'payment',
    loadComponent: () =>
      import('./components/payment/payment.component').then(
        (m) => m.PaymentComponent
      ),
  },
];
