import { Component, OnInit } from '@angular/core';
import { RedireccionamientoService } from '../services/redireccionamiento.service';
import { RegistroService } from '../services/registro.service';
import { LoginserviceService } from '../services/loginservice.service';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.page.html',
  styleUrls: ['./almacen.page.scss'],
})
export class AlmacenPage implements OnInit {

  registros: any[] = [];
  nombreUsuario: string = '';

  constructor(private redireccionamiento: RedireccionamientoService, private registroService: RegistroService, private auth: LoginserviceService) {}
  
  nav (data:string){
    this.redireccionamiento.redireccion(data);
  }

  ngOnInit() {
    this.registroService.obtenerRegistros().subscribe(data => {
      this.registros = data;
    });

    const usuario = this.auth.obtenerUsuario();
    if(usuario){
      this.nombreUsuario = usuario.nombre;
    }
  }

}
