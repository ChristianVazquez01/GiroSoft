import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RedireccionamientoService } from '../services/redireccionamiento.service';
import { LoginserviceService } from '../services/loginservice.service';

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
    private redireccionamiento: RedireccionamientoService,
    private auth: LoginserviceService
  ) {}

  async login(form: NgForm) {
    if (!form.valid) {
      return;
    }

    // this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...'
    });
    await loading.present();

    const email = form.value.email;
    const contrasena = form.value.password

    this.auth.login(email, contrasena).subscribe(
      async(resp) => {
        await loading.dismiss();

        // Guardar sesión y redireccionar
        this.auth.guardarSesion(resp.user);
        this.redireccionamiento.redireccion('/panel');
      },

      async(err) => {
        await loading.dismiss();
        this.showAlert("Error", "Usuario o contraseña incorrectos");
      }
    );
  

    //     setTimeout(async () => {
    //       this.isLoading = false;
    //       await loading.dismiss();

    //       let credencialesCorrectas = false;

    // if (form.value.email === 'admin@girosoft.com' && form.value.password === 'Dismuto11') {
    //   this.redireccionamiento.redireccion('/panel');
    //   credencialesCorrectas = true;
    // } else if (form.value.email === 'user@girosoft.com' && form.value.password === 'Usuario11') {
    //   this.redireccionamiento.redireccion('/entrada');
    //   credencialesCorrectas = true;
    // }

    // if (!credencialesCorrectas) {
    //   this.showAlert('Error', 'Email o contraseña incorrectos');
    // }
    //   }, 1500);
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