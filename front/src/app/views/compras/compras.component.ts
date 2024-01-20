import { Component } from '@angular/core';   
import { Icompras } from '../../Interfaces/icompras';
import { ComprasService } from '../../Services/compras.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-compras',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css',
})
export class CompraComponent {
  title = 'Compras';
  compras: Icompras[];

  constructor(private comprasServicio: ComprasService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.comprasServicio.todos().subscribe((listacompras) => {
      this.compras = listacompras;
      console.log(listacompras);
    });
  }
  alerta() {
    Swal.fire('compras', 'Mensaje en compras', 'success');
  }

  eliminar(id_compras: number) {
    Swal.fire({
      title: 'Compras',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.comprasServicio.eliminar(id_compras).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'compras',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'compras',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
