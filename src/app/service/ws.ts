import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita } from '../entities/Cita';

@Injectable({
  providedIn: 'root',
})
export class Ws {
  constructor(private http: HttpClient) {}
  urlCita = 'http://localhost:8010/api/citas';
  getAuthHeader() {
    const token = sessionStorage.getItem('auth');
    return token ? `Basic ${token}` : '';
  }

  // CRUD DE CITAS ------------------------------------------------------
  listarCita() {
    return this.http.get<Cita[]>(this.urlCita);
  }

  guardarCita(cita: Cita) {
    return this.http.post<String>(this.urlCita + '/guardar', cita);
  }

  actualizarCita(cita: Cita) {
    return this.http.put<String>(this.urlCita + '/editar', cita);
  }

  eliminarCita(idCita: Number) {
    return this.http.delete<void>(this.urlCita + '/eliminar/' + idCita);
  }

  buscarCita(idCita: Cita) {
    return this.http.post<Cita>(this.urlCita + '/buscar/', idCita);
  }
}
