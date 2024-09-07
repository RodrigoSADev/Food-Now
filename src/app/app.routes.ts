import { Route } from '@angular/router';
import { FoodListComponent } from './components/food-list/food-list.component';

export const appRoutes: Route[] = [
  {
    path: 'hamburguer',
    component: FoodListComponent,
    title: 'Food Now |  Hamburguer',
  },
  { path: 'pizza', component: FoodListComponent, title: 'Food Now |  Pizza' },
  {
    path: 'bebidas',
    component: FoodListComponent,
    title: 'Food Now |  Bebidas',
  },
  { path: '', redirectTo: '/hamburguer', pathMatch: 'full' },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
    title: 'Food Now |  Checkout',
  },
  {
    path: 'confirm-order',
    loadComponent: () =>
      import('./pages/order-confirmation/order-confirmation.component').then(
        (m) => m.OrderConfirmationComponent
      ),
    title: 'Food Now |  Pedido Confirmado',
  },
];
