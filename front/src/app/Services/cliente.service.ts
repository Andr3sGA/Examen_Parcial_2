import { HttpClient } from '@angular/common/http';   
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icliente } from '../Interfaces/icliente';
import { environment } from '../../environments/environment.development';

@Injectable({ 
  providedIn: 'root',
})
export class ProveedorService {
  private urlBase: string = environment.URL + 'cliente.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}
  todos(): Observable<Icliente[]> {
    return this.clientePhp.get<Icliente[]>(this.urlBase + 'todos');
  }
  insertar(proveedor: Icliente): Observable<any> {
    var prov = new FormData();
    prov.append('nombre', proveedor.nombre);
    prov.append('descripcion', proveedor.direccion);
    return this.clientePhp.post(this.urlBase + 'insertar', prov);
  }
  eliminar(id: number): Observable<any> {
    var prov = new FormData();
    prov.append('id_clientes', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', prov);
  }
  uno(id: number): Observable<Icliente> {
    var prov = new FormData();
    prov.append('id_clientes', id.toString());
    return this.clientePhp.post<Icliente>(this.urlBase + 'uno', prov);
  }
  actualizar(proveedor: Icliente, id: number): Observable<any> {
    var prov = new FormData();
    prov.append('id_clientes', id.toString());
    prov.append('nombre', proveedor.nombre);
    prov.append('descripcion', proveedor.direccion);
    return this.clientePhp.post(this.urlBase + 'actualizar', prov);
  }
}


