import { Component, OnInit } from '@angular/core';
import { RedireccionamientoService } from '../services/redireccionamiento.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {

  constructor(private redireccionamiento: RedireccionamientoService) {}
       nav (data:string){
       this.redireccionamiento.redireccion(data);
     }

  ngOnInit() {
  }

}
