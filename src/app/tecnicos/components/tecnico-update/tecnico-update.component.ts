import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Tecnico } from 'src/app/core/models/pessoa';
import { TecnicosService } from 'src/app/core/services/tecnicos/tecnicos.service';
import { someTrue, trueIndexes, profileChecked } from 'src/app/shared/utils';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.scss']
})
export class TecnicoUpdateComponent implements OnInit {
  errorMsg = '';
  error = false;
  loading = true;

  tecnicoForm = this.fb.group({
    id: [null],
    nome: [null, [Validators.required]],
    cpf: [null, [Validators.required, Validators.maxLength(14)]],
    email: [null, [Validators.required, Validators.email]],
    senha: [null],
    perfils: this.fb.array([[false], [false], [false]], [someTrue]),
  });

  constructor(
    private route: ActivatedRoute,
    private tecnicosService: TecnicosService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router
  ) {}

  onSubmit() {
    const tecnico: Tecnico = {
      ...this.tecnicoForm.value,
      perfils: trueIndexes(this.tecnicoForm.value.perfils),
    };
    
    const ref = this.toast.loading('Atualizando tecnico');

    this.tecnicosService.update(tecnico).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Tecnico atualizado');
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

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tecnicosService.findById(id).subscribe({
      next: (tecnico) => {
        tecnico.senha = '';
        const perfils = profileChecked(tecnico.perfils as string[]);
        this.tecnicoForm.patchValue(tecnico);
        this.tecnicoForm.get('perfils')?.setValue(perfils);
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
