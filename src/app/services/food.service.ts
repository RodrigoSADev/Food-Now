import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodData } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private readonly apiUrl = 'https://food-now-api.vercel.app/foods';
  httpClient = inject(HttpClient);

  getFoods(): Observable<FoodData> {
    return this.httpClient.get<FoodData>(this.apiUrl);
  }
}
