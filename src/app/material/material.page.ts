import { Component, OnInit } from '@angular/core';
import { RedireccionamientoService } from '../services/redireccionamiento.service';
import { InventarioService } from '../services/inventario.service';
import { LoginserviceService } from '../services/loginservice.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {

  inventario: any[] = [];
  editando: any = null;
  cantidadNueva: number = 0;
  nombreUsuario: string = '';

  constructor(private redireccionamiento: RedireccionamientoService, 
    private inventarioService: InventarioService,
    private auth: LoginserviceService) {}
  
  nav (data:string){
    this.redireccionamiento.redireccion(data);
  }

  ngOnInit() {
    this.cargarInventario();
    const usuario = this.auth.obtenerUsuario();
    if(usuario){
      this.nombreUsuario = usuario.nombre;
      console.log("Usuario:", usuario)
    }
  }

  cargarInventario() {
    this.inventarioService.obtenerInventario().subscribe(data => {
      this.inventario = data;
    });
  }

  editar(item: any){
    this.editando = { ...item };
    this.cantidadNueva = item.inv_cantidad;
  }

  guardarCambios(){
    this.inventarioService.actualizarStock(this.editando.inv_id, this.cantidadNueva).subscribe(() => {
      this.editando = null;
      this.cargarInventario();
    });
  }

  cancelarEdicion(){
    this.editando = null;
  }

  eliminar(id: number){
    if(!confirm("¿Seguro que deseas eliminar este material del inventario?")) return;

    this.inventarioService.eliminarStock(id).subscribe(() => {
      this.cargarInventario();
    });
  }

}
