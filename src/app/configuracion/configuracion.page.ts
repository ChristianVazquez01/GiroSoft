import { Component, OnInit } from '@angular/core';
import { RedireccionamientoService } from '../services/redireccionamiento.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  constructor(private redireccionamiento: RedireccionamientoService) {}
       nav (data:string){
       this.redireccionamiento.redireccion(data);
     }

  ngOnInit() {
  }

}
