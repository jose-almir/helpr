import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY, Observable } from 'rxjs';
import { Cliente, Tecnico } from 'src/app/core/models/pessoa';
import { ChamadosService } from 'src/app/core/services/chamados/chamados.service';
import { ClientesService } from 'src/app/core/services/clientes/clientes.service';
import { TecnicosService } from 'src/app/core/services/tecnicos/tecnicos.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.scss'],
})
export class ChamadoCreateComponent implements OnInit {
  clientes$: Observable<Cliente[]> = EMPTY;
  tecnicos$: Observable<Tecnico[]> = EMPTY;

  chamadoForm = this.fb.group({
    prioridade: [null, [Validators.required]],
    status: [null, [Validators.required]],
    titulo: [null, [Validators.required]],
    observacoes: [null, [Validators.required]],
    tecnico: [null, [Validators.required]],
    cliente: [null, [Validators.required]],
  });

  constructor(
    private chamadosService: ChamadosService,
    private clientesService: ClientesService,
    private tecnicosService: TecnicosService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router
  ) {}

  onSubmit() {
    const ref = this.toast.loading('Adicionando chamado...');
    this.chamadosService.create(this.chamadoForm.value).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Chamado adicionado');
        this.router.navigate(['chamados']);
      },
      error: (err) => {
        console.log(err);
        ref.close();
        switch (err.status) {
          case 403:
            return this.toast.error('Ação não permitida');
          default:
            return this.toast.error(
              `Um erro aconteceu: ${err.error.message ?? ''}`
            );
        }
      },
    });
  }

  ngOnInit(): void {
    this.clientes$ = this.clientesService.findAll();
    this.tecnicos$ = this.tecnicosService.findAll();
  }
}
