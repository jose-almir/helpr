import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/pessoa';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clientesUrl = `${API_CONFIG.baseUrl.prod}/service/clientes`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clientesUrl);
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.clientesUrl}/${id}`);
  }

  create(cliente: Cliente) {
    return this.http.post(this.clientesUrl, cliente);
  }

  update(cliente: Cliente) {
    return this.http.put(`${this.clientesUrl}/${cliente.id}`, cliente);
  }

  delete(id: number) {
    return this.http.delete(`${this.clientesUrl}/${id}`);
  }
}
