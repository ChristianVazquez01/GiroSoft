import { Component, OnInit } from '@angular/core';
import { RedireccionamientoService } from '../services/redireccionamiento.service';
import { LoginserviceService } from '../services/loginservice.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  nombreUsuario: string = '';

  constructor(private redireccionamiento: RedireccionamientoService, private auth: LoginserviceService) {}
       nav (data:string){
       this.redireccionamiento.redireccion(data);
     }

  ngOnInit() {
    const usuario = this.auth.obtenerUsuario();
    if(usuario){
      this.nombreUsuario = usuario.nombre;
    }
  }

}
