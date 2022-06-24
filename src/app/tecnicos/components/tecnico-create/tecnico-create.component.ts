import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Tecnico } from 'src/app/core/models/pessoa';
import { TecnicosService } from 'src/app/core/services/tecnicos/tecnicos.service';
import { someTrue, trueIndexes } from 'src/app/shared/utils';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.scss'],
})
export class TecnicoCreateComponent implements OnInit {
  tecnicoForm = this.fb.group({
    nome: [null, [Validators.required]],
    cpf: [null, [Validators.required, Validators.maxLength(14)]],
    email: [null, [Validators.required, Validators.email]],
    senha: [null, [Validators.required]],
    perfils: this.fb.array([[false], [false], [true]], [someTrue]),
  });

  constructor(
    private fb: FormBuilder,
    private tecnicosService: TecnicosService,
    private toast: HotToastService,
    private router: Router
  ) {}

  onSubmit() {
    const tecnico: Tecnico = {
      ...this.tecnicoForm.value,
      perfils: trueIndexes(this.tecnicoForm.value.perfils),
    };

    const ref = this.toast.loading('Adicionando tecnico');

    this.tecnicosService.create(tecnico).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Tecnico criado');
        this.router.navigate(['tecnicos']);
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
