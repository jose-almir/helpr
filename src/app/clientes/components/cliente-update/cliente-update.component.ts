import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Cliente } from 'src/app/core/models/pessoa';
import { ClientesService } from 'src/app/core/services/clientes/clientes.service';
import { profileChecked, someTrue, trueIndexes } from 'src/app/shared/utils';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.scss'],
})
export class ClienteUpdateComponent implements OnInit {
  errorMsg = '';
  error = false;
  loading = true;

  clienteForm = this.fb.group({
    id: [null],
    nome: [null, [Validators.required]],
    cpf: [null, [Validators.required, Validators.maxLength(14)]],
    email: [null, [Validators.required, Validators.email]],
    senha: [null],
    perfils: this.fb.array([[false], [false], [false]], [someTrue]),
  });

  constructor(
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router
  ) {}

  onSubmit() {
    const cliente: Cliente = {
      ...this.clienteForm.value,
      perfils: trueIndexes(this.clienteForm.value.perfils),
    };
    
    const ref = this.toast.loading('Atualizando cliente');

    this.clientesService.update(cliente).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Cliente atualizado');
        this.router.navigate(['clientes']);
      },
      error: (err) => {
        ref.close();
        switch (err.status) {
          case 403:
            return this.toast.error('Ação não permitida');
          case 409:
            return this.toast.error(err.error.message);
          default:
            return this.toast.error(
              `Um erro aconteceu: ${err.error.message ?? ''}`
            );
        }
      },
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.clientesService.findById(id).subscribe({
      next: (cliente) => {
        cliente.senha = '';
        const perfils = profileChecked(cliente.perfils as string[]);
        this.clienteForm.patchValue(cliente);
        this.clienteForm.get('perfils')?.setValue(perfils);
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
