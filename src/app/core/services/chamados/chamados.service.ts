import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Chamado } from '../../models/chamado';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  chamadosUrl = `${API_CONFIG.baseUrl.prod}/service/chamados`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.chamadosUrl);
  }

  findById(id: number): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.chamadosUrl}/${id}`);
  }

  create(chamado: Chamado) {
    return this.http.post(this.chamadosUrl, chamado);
  }

  update(chamado: Chamado) {
    return this.http.put(`${this.chamadosUrl}/${chamado.id}`, chamado);
  }
}
