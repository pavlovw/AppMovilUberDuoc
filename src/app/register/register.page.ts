import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  fullName: string = '';
  username: string = '';
  birthdate: string = ''; 
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      await this.presentAlert('Las contraseñas no coinciden.');
      return;
    }

    const [firstName, lastName] = this.fullName.split(' ');

    const isRegistered = this.authService.register(
      firstName || '',
      lastName || '',
      this.username,
      this.password,
      this.birthdate 
    );
    
    if (isRegistered) {
      this.router.navigate(['/home']);
    } else {
      await this.presentAlert('El nombre de usuario ya está en uso');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  clearForm() {
    this.fullName = '';
    this.username = '';
    this.birthdate = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
