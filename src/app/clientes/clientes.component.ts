import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY, Observable } from 'rxjs';
import { Cliente } from '../core/models/pessoa';
import { ClientesService } from '../core/services/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'cpf',
    'dataCriacao',
    'acoes', // btn -> editar e deletar
  ];

  clientes$: Observable<Cliente[]> = EMPTY;

  constructor(
    private clientesService: ClientesService,
    private toast: HotToastService
  ) {}

  delete(id: number) {
    const canDelete = confirm('Tem certeza?');

    if (canDelete) {
      const ref = this.toast.loading('Deletando usuário');

      this.clientesService.delete(id).subscribe({
        next: () => {
          this.clientes$ = this.clientesService.findAll();
          this.toast.success('Usuário deletado');
          ref.close();
        },
        error: (err) => {
          ref.close();
          switch (err.status) {
            case 403:
              return this.toast.error('Usuário não tem permissão');
            case 409:
              return this.toast.error(err.error.message);
            default:
              return this.toast.error('Um erro aconteceu');
          }
        },
      });
    }
  }

  ngOnInit(): void {
    this.clientes$ = this.clientesService.findAll();
  }
}
