import { Component, OnInit } from '@angular/core';
import { RegistroMaterial } from './empleado.modelo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RedireccionamientoService } from '../services/redireccionamiento.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class EntradaPage implements OnInit {
  materiales: RegistroMaterial[] = [];
  nuevoMaterial: RegistroMaterial = {
    id: 0,
    nombre: '',
    cantidad: 0,
    proveedor: '',
    fechaEntrada: '',
    recibidoPor: '',
    entregadoPor: '',
  };
  modoEdicion = false;
  materialEditando: RegistroMaterial | null = null;

  constructor(private redireccionamiento: RedireccionamientoService) {}

  nav(data: string) {
    this.redireccionamiento.redireccion(data);
  }

  ngOnInit() {}

  agregarMaterial() {
    const m = this.nuevoMaterial;
    if (!m.nombre || !m.cantidad || !m.proveedor || !m.fechaEntrada || !m.recibidoPor || !m.entregadoPor) return;
    m.id = Date.now();
    this.materiales.push({ ...m });
    this.nuevoMaterial = {
      id: 0,
      nombre: '',
      cantidad: 0,
      proveedor: '',
      fechaEntrada: '',
      recibidoPor: '',
      entregadoPor: '',
    };
  }

  editarMaterial(material: RegistroMaterial) {
    this.modoEdicion = true;
    this.materialEditando = { ...material };
  }

  actualizarMaterial() {
    if (!this.materialEditando) return;
    const index = this.materiales.findIndex(m => m.id === this.materialEditando!.id);
    if (index > -1) this.materiales[index] = { ...this.materialEditando };
    this.cancelarEdicion();
  }

  eliminarMaterial(id: number) {
    this.materiales = this.materiales.filter(m => m.id !== id);
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.materialEditando = null;
  }
}