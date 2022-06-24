import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { EMPTY, Observable } from 'rxjs';
import { Cliente, Tecnico } from 'src/app/core/models/pessoa';
import { ChamadosService } from 'src/app/core/services/chamados/chamados.service';
import { ClientesService } from 'src/app/core/services/clientes/clientes.service';
import { TecnicosService } from 'src/app/core/services/tecnicos/tecnicos.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.scss'],
})
export class ChamadoUpdateComponent implements OnInit {
  clientes$: Observable<Cliente[]> = EMPTY;
  tecnicos$: Observable<Tecnico[]> = EMPTY;
  errorMsg = '';
  error = false;
  loading = true;

  chamadoForm = this.fb.group({
    id: [null],
    prioridade: [null, [Validators.required]],
    status: [null, [Validators.required]],
    titulo: [null, [Validators.required]],
    observacoes: [null, [Validators.required]],
    tecnico: [null, [Validators.required]],
    cliente: [null, [Validators.required]],
  });

  constructor(
    private clientesService: ClientesService,
    private tecnicosService: TecnicosService,
    private chamadosService: ChamadosService,
    private toast: HotToastService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    const ref = this.toast.loading('Atualizando chamado...');
    this.chamadosService.update(this.chamadoForm.value).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Chamado atualizado!');
        this.router.navigate(['chamados']);
      },
      error: (err) => {
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

    const id = this.route.snapshot.params['id'];
    this.chamadosService.findById(id).subscribe({
      next: (chamado) => {
        this.chamadoForm.patchValue(chamado);
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        if (!this.errorMsg) this.errorMsg = 'Um erro aconteceu';
        this.error = true;
        this.loading = false;
      },
    });
  }
}
