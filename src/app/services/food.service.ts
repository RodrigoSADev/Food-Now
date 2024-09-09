import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { FoodData } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private readonly apiUrl = 'https://food-now-api.vercel.app/foods';
  private readonly apiUrlBackup =
    'https://food-now-api-rodrigo-silvas-projects-75bfc7dd.vercel.app/foods';
  httpClient = inject(HttpClient);

  getFoods(): Observable<FoodData> {
    return this.httpClient.get<FoodData>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro na API principal, tentando API reserva:', error);
        // Se der erro, tenta a API reserva
        return this.httpClient.get<FoodData>(this.apiUrlBackup);
      })
    );
  }
}
