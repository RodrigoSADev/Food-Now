import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cep } from '../interfaces/cep.interface';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private readonly apiUrl = 'https://viacep.com.br/ws';

  httpClient = inject(HttpClient);

  searchCep(cep: string): Observable<Cep> {
    return this.httpClient.get<Cep>(`${this.apiUrl}/${cep}/json/`);
  }
}
