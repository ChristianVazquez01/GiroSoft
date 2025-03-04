import { Injectable } from '@angular/core';
import {NavController} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class RedireccionamientoService {

  constructor(private navController:NavController) {
    }
    redireccion(data:string){
      this.navController.navigateRoot(data)
   }
}
