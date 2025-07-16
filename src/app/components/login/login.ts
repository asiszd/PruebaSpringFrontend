import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../entities/User';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  error = false;
  user = new User();

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = btoa('ASIS:admin123');
    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('ASIS:admin123'),
      }),
    };

    this.http.get('http://localhost:8010/api/citas', httpOptions).subscribe({
      next: () => {
        sessionStorage.setItem('auth', credentials);
        this.router.navigate(['/citas']);
      },
      error: () => {
        console.log(this.user.username);
        console.log(this.user.password);
        this.error = true;
      },
    });
  }
}
