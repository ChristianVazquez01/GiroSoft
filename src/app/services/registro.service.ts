import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private url = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  // Obtener catálogos para los desplegables
  obtenerMateriales(): Observable<any>{
    return this.http.get(`${this.url}/materiales`);
  }

  // Lista de empresas
  obtenerProveedores(): Observable<any>{
    return this.http.get(`${this.url}/proveedores`);
  }

  obtenerProveedorPorEmpresa(empresa: string): Observable<any>{
    return this.http.get(`${this.url}/proveedores/${empresa}/personas`);
  }

  obtenerEncargados(): Observable<any>{
    return this.http.get(`${this.url}/encargados`);
  }

  // Obtener tabla completa de registros
  obtenerRegistros(): Observable<any>{
    return this.http.get(`${this.url}/registro`);
  }

  // obtenerRegistros(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  // Registrar la entrada de un material
  registrarEntrada(data: any): Observable<any>{
    return this.http.post(`${this.url}/registro`, data);
  }

  // Obtener los últimos 3 registros
  obtenerUltimosRegistros(): Observable<any> {
    return this.http.get(`${this.url}/registro/ultimos`);
  }

  // Editar un registro
  editarRegistro(id: number, cantidad: number): Observable<any> {
    console.log("datos:",cantidad);
    return this.http.put(`${this.url}/registro/${id}`, { cantidad });
  }

  eliminarRegistro(id: number): Observable<any>{
    return this.http.delete(`${this.url}/registro/${id}`);
  }
}
