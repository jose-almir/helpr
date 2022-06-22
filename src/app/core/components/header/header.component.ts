import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

interface MenuItem {
  link: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.onLogout();
    this.router.navigate(['/auth']);
  }

  itensMenu: MenuItem[] = [
    {
      link: '/home',
      label: 'Página inicial',
      icon: 'home',
    },
    {
      link: '/chamados',
      label: 'Chamados',
      icon: 'assignment',
    },
    {
      link: '/clientes',
      label: 'Clientes',
      icon: 'people',
    },
    {
      link: '/tecnicos',
      label: 'Técnicos',
      icon: 'engineering',
    },
  ];
}
