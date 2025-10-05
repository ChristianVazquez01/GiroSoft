import { Component } from '@angular/core';
import { RedireccionamientoService} from '../services/redireccionamiento.service'

@Component({ selector: 'app-home', templateUrl: 'home.page.html', styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private redireccionamiento: RedireccionamientoService) {}
    nav (data:string){
    this.redireccionamiento.redireccion(data);
  }
}
  