import { Component } from '@angular/core'; 
import { Icliente } from '../../Interfaces/icliente';
import { ProveedorService } from '../../Services/cliente.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clientes', 
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ProveedoresComponent {
  title = 'clientes';
  proveedores: Icliente[];

  constructor(private proveedoresServicio: ProveedorService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.proveedoresServicio.todos().subscribe((listaproveedores) => {
      this.proveedores = listaproveedores;
      console.log(listaproveedores);
    });
  }
  alerta() {
    Swal.fire('clientes', 'Mensaje en clientes', 'success');
  }

  eliminar(id_clientes: number) {
    Swal.fire({
      title: 'clientes',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedoresServicio.eliminar(id_clientes).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'clientes',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
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
