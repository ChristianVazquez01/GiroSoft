import { Component, OnInit } from '@angular/core';
import { RedireccionamientoService} from '../services/redireccionamiento.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private redireccionamiento: RedireccionamientoService) { }
  nav (data:string){
    this.redireccionamiento.redireccion(data);
  }
  ngOnInit() {
  }

}
