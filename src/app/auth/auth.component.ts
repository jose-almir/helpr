import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    const { email, senha } = this.loginForm.value;

    const ref = this.toast.loading('Fazendo login...');

    this.authService.login(email, senha).subscribe({
      next: (response) => {
        ref.close();
        const token = response.headers.get('Authorization');
        this.authService.onLogin(token!.substring(7));
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toast.error('Email/senha inválido(s)');
        ref.close();
      },
    });
  }

  ngOnInit(): void {}
}
