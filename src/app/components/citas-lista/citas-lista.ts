import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFabButton, MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Cita } from '../../entities/Cita';
import { Ws } from '../../service/ws';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-lista',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon,
    MatFabButton,
    MatTabsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    MatCardContent,
    CommonModule,
    DatePipe,
  ],
  templateUrl: './citas-lista.html',
  styleUrl: './citas-lista.css',
})
export class CitasLista implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'fecha',
    'duenio',
    'motivo',
    'telefono',
    'mascotaNombre',
    'mascotaTipo',
    'editar',
    'eliminar',
  ];

  citas: Cita[] = [];
  dataSource!: MatTableDataSource<Cita>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: Ws, private router: Router) {}

  ngAfterViewInit(): void {
    this.listarCitas();
  }

  listarCitas() {
    this.service.listarCita().subscribe((data) => {
      this.citas = data;
      this.dataSource = new MatTableDataSource(this.citas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editar(cita: Cita) {
    localStorage.setItem('idMascota', cita.id.toString());
    this.router.navigate(['editar']);
  }

  crear() {
    this.router.navigate(['crear']);
  }
  eliminar(cita: Cita) {
    Swal.fire({
      title: '¿Desea eliminar el registro de la cita?',
      text: 'Esta acción no se podrá revertir',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarCita(cita.id).subscribe(
          (data) => {
            Swal.fire({
              title: 'Se ha eliminado el registro de la mascota correctamente!',
              icon: 'success',
              timer: 3500,
            });
            this.listarCitas();
          },
          (error) => {
            Swal.fire({
              title: 'Ocurrió un error!',
              icon: 'error',
              text: 'No se ha podido eliminar el registro, por favor contacte al administrador.',
              showConfirmButton: false,
              timer: 4500,
            });
          }
        );
      }
    });
  }
}
