import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, EMPTY } from 'rxjs';
import { Tecnico } from '../core/models/pessoa';
import { TecnicosService } from '../core/services/tecnicos/tecnicos.service';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.scss']
})
export class TecnicosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'cpf',
    'dataCriacao',
    'acoes', // btn -> editar e deletar
  ];

  tecnicos$: Observable<Tecnico[]> = EMPTY;

  constructor(
    private tecnicosService: TecnicosService,
    private toast: HotToastService
  ) {}

  delete(id: number) {
    const canDelete = confirm('Tem certeza?');

    if (canDelete) {
      const ref = this.toast.loading('Deletando usuário');

      this.tecnicosService.delete(id).subscribe({
        next: () => {
          this.tecnicos$ = this.tecnicosService.findAll();
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
    this.tecnicos$ = this.tecnicosService.findAll();
  }

}
