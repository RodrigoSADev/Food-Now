import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICep } from '../interfaces/cep.interface';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  httpClient = inject(HttpClient);

  private readonly apiUrl = 'https://viacep.com.br/ws';

  searchCep(cep: string): Observable<ICep> {
    return this.httpClient.get<ICep>(`${this.apiUrl}/${cep}/json/`);
  }
}
