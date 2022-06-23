import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Cliente } from 'src/app/core/models/pessoa';
import { ClientesService } from 'src/app/core/services/clientes/clientes.service';
import { someTrue, trueIndexes } from 'src/app/shared/utils';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss'],
})
export class ClienteCreateComponent implements OnInit {
  clienteForm = this.fb.group({
    nome: [null, [Validators.required]],
    cpf: [null, [Validators.required, Validators.maxLength(14)]],
    email: [null, [Validators.required, Validators.email]],
    senha: [null, [Validators.required]],
    perfils: this.fb.array([[false], [true], [false]], [someTrue]),
  });

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private toast: HotToastService,
    private router: Router
  ) {}

  onSubmit() {
    const cliente: Cliente = {
      ...this.clienteForm.value,
      perfils: trueIndexes(this.clienteForm.value.perfils),
    };

    const ref = this.toast.loading('Adicionando cliente');

    this.clientesService.create(cliente).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Cliente criado');
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

  ngOnInit(): void {}
}
