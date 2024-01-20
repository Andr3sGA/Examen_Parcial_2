import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Icompras } from '../Interfaces/icompras';
import { Observable } from 'rxjs';  


@Injectable({  
    providedIn: 'root'
  })
  export class ComprasService {
   private urlBase:String = 
   'http://localhost/examen_parcial_2/Inventario/Controllers/compras.Controller.php?op=';
    constructor(private clientePhp:HttpClient) {}
  
    todos():Observable<Icompras[]>{
      return this.clientePhp.get<Icompras[]>(this.urlBase + 'todos');
  }
  uno(id: number): Observable<Icompras>{
     var sto = new FormData();
     sto.append('id_compras', id.toString());
    return this.clientePhp.post<Icompras>(this.urlBase + 'uno',sto);
  }
  
  insertar(compra:Icompras):Observable<any>{
    var sto = new FormData();

    sto.append('id_compra', compra.id_compra.toString());

    sto.append('id_cliente', compra.id_cliente.toString());
    sto.append('id_producto', compra.id_producto.toString());
    sto.append('cantidad', compra.cantidad.toString());
    sto.append('total', compra.total.toString());
    return this.clientePhp.post(this.urlBase + 'insertar', sto);
  
  }
  actualizar(compra:Icompras, id: number):Observable<any>{
    var sto = new FormData();

    sto.append('id_compra', id.toString());
    sto.append('id_cliente', compra.id_cliente.toString());
    
    sto.append('id_producto', compra.id_producto.toString());
    sto.append('cantidad', compra.cantidad.toString());
    sto.append('total', compra.total.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', sto);
  }
  eliminar(id:number):Observable<any>{
    var sto = new FormData();
    sto.append('id_compra', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', sto);
  }
  

  }