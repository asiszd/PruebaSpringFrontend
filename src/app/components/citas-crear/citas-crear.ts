import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatFabButton } from '@angular/material/button';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Cita } from '../../entities/Cita';
import { Raza } from '../../entities/Raza';
import { Router } from '@angular/router';
import { Ws } from '../../service/ws';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-crear',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIcon,
    MatTabsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    MatCardContent,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatCardActions,
    MatFabButton,
  ],
  templateUrl: './citas-crear.html',
  styleUrl: './citas-crear.css',
})
export class CitasCrear implements OnInit {
  cita = new Cita();
  razas: Raza[] = [];

  constructor(private router: Router, private service: Ws) {}

  ngOnInit(): void {
    this.getRazas();
  }

  regresar() {
    this.router.navigate(['']);
  }

  getRazas() {
    this.service.getRazas().subscribe((data) => {
      this.razas = data;
      console.log(data);
    });
  }
  validaNumeros(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete', // navegación y punto
    ];

    // Permitir números
    if (
      (event.key >= '0' && event.key <= '9') ||
      allowedKeys.includes(event.key)
    ) {
      return;
    } else {
      event.preventDefault();
    }
  }
  guardar() {
    this.service.guardarCita(this.cita).subscribe(
      (data) => {
        Swal.fire({
          title: 'Guardado!',
          icon: 'success',
          text: 'Se ha agendado la cita correctamente!',
          showConfirmButton: false,
          timer: 3500,
        });
        this.router.navigate(['citas']);
      },
      (error) => {
        Swal.fire({
          title: 'Ocurrió un error!',
          icon: 'error',
          text: JSON.stringify(error.error.mensaje),
          showConfirmButton: false,
          timer: 3500,
        });
      }
    );
  }
}
