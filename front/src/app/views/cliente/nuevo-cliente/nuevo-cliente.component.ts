import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  
  FormControl, 
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProveedorService } from '../../../Services/cliente.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css',
})
export class NuevoProveedorComponent {
  title = '';
  id!: number; 

  provedor: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
  });
  constructor(
    private proveedorServicio: ProveedorService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo clientes';
    } else {
      this.title = 'Actualizar clientes';
      this.proveedorServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.provedor.patchValue({
          nombre: res.nombre,
          direccion: res.direccion,
          telefono: res.telefono,

        }); 
      });
    }
  }
  get f() {
    return this.provedor.controls;
  }

  grabar() {
    Swal.fire({
      title: 'clientes',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.proveedorServicio
            .insertar(this.provedor.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'clientes',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/clientes']);
              this.id = 0;
            });
        } else {
          this.proveedorServicio
            .actualizar(this.provedor.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'clientes',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/clientes']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'clientes',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
