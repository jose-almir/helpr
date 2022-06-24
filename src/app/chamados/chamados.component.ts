import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Chamado } from '../core/models/chamado';
import { ChamadosService } from '../core/services/chamados/chamados.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.scss'],
})
export class ChamadosComponent implements OnInit {
  chamados$: Observable<Chamado[]> = EMPTY;

  constructor(private chamadosService: ChamadosService) {}

  displayedColumns: string[] = [
    'id',
    'titulo',
    'status',
    'prioridade',
    'observacoes',
    'acoes',
  ];

  ngOnInit(): void {
    this.chamados$ = this.chamadosService.findAll();
  }
}
