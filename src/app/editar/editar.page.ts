import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  updatedUser: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.updatedUser = { ...currentUser };
    } else {
      console.error('No se encontró el usuario actual.');
    }
  }

  onSubmit() {
    if (this.updatedUser.username && this.updatedUser.fullName && this.updatedUser.birthdate) {

      this.updatedUser.birthdate = new Date(this.updatedUser.birthdate).toISOString().split('T')[0];
      this.authService.updateUser(this.updatedUser);
      

      this.router.navigate(['/perfil']).then(() => {
        window.location.reload();
      });
    } else {
      console.error('Por favor complete todos los campos.');
    }
  }
}
