import { Component } from '@angular/core';
import {   
  FormGroup, 
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ComprasService } from '../../../Services/compras.service';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../../Services/cliente.service';
import { Icliente } from '../../../Interfaces/icliente';

@Component({
  selector: 'app-nuevo-compra',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-compra.component.html',
  styleUrl: './nuevo-compra.component.css',
})
export class NuevoCompraComponent {
  title = 'Nuevo compra';
  id!: number;

  ListaProveedores: Icliente[];
  compra: FormGroup = new FormGroup({
    id_cliente: new FormControl('', Validators.required),
    id_producto: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
   
  });
  constructor(
    private compraServicio: ComprasService,
    private rutas: Router,
    private parametros: ActivatedRoute,
    private proveedorServicio: ProveedorService
  ) {}
  async ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    await this.cargaProveedor();
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo compra';
    } else {
      this.title = 'Actualizar compra';
      this.compraServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.compra.patchValue({
          id_clientes: res.id_cliente,
          id_producto: res.id_producto,
          cantidad: res.cantidad,
          total: res.total,
    
        });
      });
    }
  }
  cargaProveedor() {
    this.proveedorServicio.todos().subscribe((res) => {
      this.ListaProveedores = res;
    });
  }

  get f() {
    return this.compra.controls;
  }
  grabar() {
    Swal.fire({
      title: 'Compras',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.compraServicio.insertar(this.compra.value).subscribe((res) => {
            Swal.fire({
              title: 'Compras',
              text: 'Se insertó con éxito el registro',
              icon: 'success',
            });
            this.rutas.navigate(['/compras']);
            this.id = 0;
          });
        } else {
          this.compraServicio
            .actualizar(this.compra.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'compras',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/compras']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Compras',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
