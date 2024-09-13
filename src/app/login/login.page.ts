import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(
    private router: Router, 
    private alertController: AlertController, 
    private authService: AuthService
  ) {}

  async onSubmit() {
    if (!this.validateUsername(this.username)) {
      this.loginError = 'Usuario incorrecto.';
      await this.presentAlert(this.loginError);
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.loginError = 'Contraseña incorrecta.';
      await this.presentAlert(this.loginError);
      return;
    }

    try {
      const isAuthenticated = await this.authService.login(this.username, this.password);

      if (isAuthenticated) {
        this.loginError = '';
        this.router.navigate(['/home']);
      } else {
        this.loginError = 'Nombre de usuario o contraseña incorrectos.';
        await this.presentAlert(this.loginError);
      }
    } catch (error) {
      this.loginError = 'Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.';
      await this.presentAlert(this.loginError);
    }
  }

  validateUsername(username: string): boolean {
    return username.length >= 3 && username.length <= 15;
  }

  validatePassword(password: string): boolean {
    return /^\d{4}$/.test(password);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnDestroy() {
    // Recargar la página cuando el componente se destruye
    window.location.reload();
  }
}
