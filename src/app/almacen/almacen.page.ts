import { Component, OnInit } from '@angular/core';
import { RedireccionamientoService } from '../services/redireccionamiento.service';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.page.html',
  styleUrls: ['./almacen.page.scss'],
})
export class AlmacenPage implements OnInit {

  constructor(private redireccionamiento: RedireccionamientoService) {}
       nav (data:string){
       this.redireccionamiento.redireccion(data);
     }

  ngOnInit() {
  }

}
