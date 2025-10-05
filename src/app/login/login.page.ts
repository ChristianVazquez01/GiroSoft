import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RedireccionamientoService } from '../services/redireccionamiento.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  isLoading = false;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private redireccionamiento: RedireccionamientoService
  ) {}

  async login(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...'
    });
    await loading.present();

    // Simulación de autenticación (reemplazar con tu lógica real)
    setTimeout(async () => {
      this.isLoading = false;
      await loading.dismiss();

      let credencialesCorrectas = false;

if (form.value.email === 'admin@girosoft.com' && form.value.password === 'Dismuto11') {
  this.redireccionamiento.redireccion('/panel');
  credencialesCorrectas = true;
} else if (form.value.email === 'user@girosoft.com' && form.value.password === 'Usuario11') {
  this.redireccionamiento.redireccion('/entrada');
  credencialesCorrectas = true;
}

if (!credencialesCorrectas) {
  this.showAlert('Error', 'Email o contraseña incorrectos');
}
  }, 1500);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método adicional para redirecciones desde el template
  nav(data: string) {
    this.redireccionamiento.redireccion(data);
  }
}