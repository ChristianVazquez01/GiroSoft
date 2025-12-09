import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private url = 'http://localhost:3000/api/inventario';

  constructor(private http: HttpClient) { }

  // Obtener tabla de inventario
  obtenerInventario(): Observable<any> { 
    return this.http.get(this.url);
  }

  actualizarStock(id: number, cantidad: number){
    return this.http.put(`${this.url}/${id}`, { cantidad });
  }

  eliminarStock(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
