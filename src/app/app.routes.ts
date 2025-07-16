import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { CitasLista } from './components/citas-lista/citas-lista';
import { CitasCrear } from './components/citas-crear/citas-crear';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'citas', component: CitasLista },
  { path: 'crear', component: CitasCrear },
];
