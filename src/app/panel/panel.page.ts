import { Component, OnInit } from '@angular/core';
import { RedireccionamientoService} from '../services/redireccionamiento.service'

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

 constructor(private redireccionamiento: RedireccionamientoService) {}
     nav (data:string){
     this.redireccionamiento.redireccion(data);
   }
  ngOnInit() {
  }

}
