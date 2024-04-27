import { Component } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
@Component({
  selector: 'app-home-proveedor',
  templateUrl: './home-proveedor.component.html',
  styleUrls: ['./home-proveedor.component.css']
})
export class HomeProveedorComponent {

  clientes: any ; 
  personaEditar: any;
  filtroClientes: any;
  modoOculto: boolean = true;
  constructor(private clientesService: ClientesService) {
  }
  ngOnInit() {
   this.getData();
  }
  
  getData(){
    this.clientesService.getData().subscribe(content => {

      this.clientes = content;
      this.filtroClientes = content;
      
    })

    // TODO: esta especificacion es con el unico fin de testing para que los modulos tengan informacion que mostrar
    this.filtroClientes = [
      {
        NIT: '123456789',
        nombre: 'Distribuidores de Colombia',
        direccion: 'Calle 1',
        telefono: '123456789'
      },
      {
        NIT: '987654321',
        nombre: 'Distribuidores de Medellin',
        direccion: 'Calle 2',
        telefono: '987654321'
      },
      {
        NIT: '123456789',
        nombre: 'Distribuidores de Bogota',
        direccion: 'Calle 1',
        telefono: '123456789'
      }
    ]

    this.clientes = [
      {
        NIT: '123456789',
        nombre: 'Distribuidores de Colombia',
        direccion: 'Calle 1',
        telefono: '123456789'
      },
      {
        NIT: '987654321',
        nombre: 'Distribuidores de Medellin',
        direccion: 'Calle 2',
        telefono: '987654321'
      },
      {
        NIT: '123456789',
        nombre: 'Distribuidores de Bogota',
        direccion: 'Calle 1',
        telefono: '123456789'
      }
    ]
  }
  
  eliminarPorId(id: number) {
    console.log(id)
    this.clientesService.eliminarPorId(id).subscribe(
      (response) => {
      console.log('Persona eliminada correctamente');
      this.getData();
    }, error => {
      console.error('Error al eliminar persona:', error);
    });
  }
  buscar(texto: Event) {
    const input = texto.target as HTMLInputElement;
    console.log(input.value);
    console.log(this.clientes);
    this.filtroClientes = this.clientes.filter( (cleinte: any) =>
      cleinte.NIT.toString().includes(input.value.toLowerCase()) ||
      cleinte.nombre.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.direccion.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.telefono.toLowerCase().includes(input.value.toLowerCase())
    );
    console.log(this.filtroClientes)
  }

  toggleModoEdicion(persona: any) {
    this.personaEditar = persona;
    this.editarModoOcuto()
    console.log("algoooo*", this.personaEditar);
  }

  editarModoOcuto(){
    this.modoOculto = !this.modoOculto;
    this.getData();
  }



}
