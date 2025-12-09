import { Component, OnInit } from '@angular/core';
// import { RegistroMaterial } from './empleado.modelo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RedireccionamientoService } from '../services/redireccionamiento.service';
import { RegistroService } from '../services/registro.service';
import { LoginserviceService } from '../services/loginservice.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class EntradaPage implements OnInit {

  nombreUsuario: string = '';

  materiales: any[] = [];
  proveedoresEmpresa: any[] = [];
  proveedores: any[] = [];
  encargados: any[] = [];

  ultimosRegistros: any[] = [];
  registroEditando: any = null;
  modoEdicion = false;

  nuevoRegistro = {
    mat_id: 0,
    prov_id: 0,
    cantidad: 0,
    fecha: '',
    enc_id: 0
  }

  // materiales: RegistroMaterial[] = [];
  // nuevoMaterial: RegistroMaterial = {
  //   id: 0,
  //   nombre: '',
  //   cantidad: 0,
  //   proveedor: '',
  //   fechaEntrada: '',
  //   recibidoPor: '',
  //   entregadoPor: '',
  // };
  // modoEdicion = false;
  // materialEditando: RegistroMaterial | null = null;

  constructor(private redireccionamiento: RedireccionamientoService, private registroService: RegistroService, private auth: LoginserviceService) {}

  nav(data: string) {
    this.redireccionamiento.redireccion(data);
  }

  ngOnInit() {
    this.cargarCatalogos();
    this.cargarUltimos();

    const usuario = this.auth.obtenerUsuario();
    if(usuario){
      this.nombreUsuario = usuario.nombre;
    }
  }

  cargarCatalogos() {
    this.registroService.obtenerMateriales().subscribe(r => this.materiales = r);
    this.registroService.obtenerProveedores().subscribe(r => this.proveedoresEmpresa = r);
    this.registroService.obtenerEncargados().subscribe(r => this.encargados = r);
  }

  cargarProveedoresPorEmpresa(event: any){
    const empresa = event.target.value;
    this.registroService.obtenerProveedorPorEmpresa(empresa).subscribe(r => {
      console.log("Empresa:", empresa );
      this.proveedores = r;
    });
  }

  registrarEntrada(){
    this.registroService.registrarEntrada(this.nuevoRegistro).subscribe(() => {
      alert("Registro agregado y stock actualizado");
      this.cargarUltimos();
    });
  }

  cargarUltimos(){
    this.registroService.obtenerUltimosRegistros().subscribe(r => {
      this.ultimosRegistros = r;
    });
  }

  editarRegistro(item: any){
    this.modoEdicion = true;
    this.registroEditando = { ...item };
  }

  guardarCambios(){
    this.registroService.editarRegistro(this.registroEditando.reg_id, this.registroEditando.reg_cantidad).subscribe(() => {
      alert("Registro actualizado");
      this.modoEdicion = false;
      this.registroEditando = null;
      this.cargarUltimos();
    });
  }

  cancelarEdicion(){
    this.modoEdicion = false;
    this.registroEditando = null;
  }

  eliminarRegistro(id: number){
    if(!confirm("¿Seguro que deseas eliminar este registro?")) return;

    this.registroService.eliminarRegistro(id).subscribe(() => {
      alert("Registro eliminado");
      this.cargarUltimos();
    });
  }


  // agregarMaterial() {
  //   const m = this.nuevoMaterial;
  //   if (!m.nombre || !m.cantidad || !m.proveedor || !m.fechaEntrada || !m.recibidoPor || !m.entregadoPor) return;
  //   m.id = Date.now();
  //   this.materiales.push({ ...m });
  //   this.nuevoMaterial = {
  //     id: 0,
  //     nombre: '',
  //     cantidad: 0,
  //     proveedor: '',
  //     fechaEntrada: '',
  //     recibidoPor: '',
  //     entregadoPor: '',
  //   };
  // }

  // editarMaterial(material: RegistroMaterial) {
  //   this.modoEdicion = true;
  //   this.materialEditando = { ...material };
  // }

  // actualizarMaterial() {
  //   if (!this.materialEditando) return;
  //   const index = this.materiales.findIndex(m => m.id === this.materialEditando!.id);
  //   if (index > -1) this.materiales[index] = { ...this.materialEditando };
  //   this.cancelarEdicion();
  // }

  // eliminarMaterial(id: number) {
  //   this.materiales = this.materiales.filter(m => m.id !== id);
  // }

  // cancelarEdicion() {
  //   this.modoEdicion = false;
  //   this.materialEditando = null;
  // }
}