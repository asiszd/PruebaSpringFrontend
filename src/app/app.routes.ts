import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { CitasLista } from './components/citas-lista/citas-lista';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'citas', component: CitasLista },
];
