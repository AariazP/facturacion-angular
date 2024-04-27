import { Component } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent {

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
        identificacion: '123456789',
        nombre: 'Juan Perez',
        direccion: 'Calle 1',
        correo: 'juanperez@gmail.com',
        fechaCreacion: '2021-09-01',
      },
      {
        identificacion: '987654321',
        nombre: 'Maria Lopez',
        direccion: 'Calle 2',
        correo: 'marialopez@gmail.com',
        fechaCreacion: '2021-09-01',
      },
      {
        identificacion: '123456789',
        nombre: 'Arsecio Perez',
        direccion: 'Calle 1',
        correo: 'arsecioperez@gmail.com',
        fechaCreacion: '2021-09-01',
      }
    ]

    this.clientes = [
      {
        identificacion: '123456789',
        nombre: 'Juan Perez',
        direccion: 'Calle 1',
        correo: 'juanperez@gmail.com',
        fechaCreacion: '2021-09-01',
      },
      {
        identificacion: '987654321',
        nombre: 'Maria Lopez',
        direccion: 'Calle 2',
        correo: 'marialopez@gmail.com',
        fechaCreacion: '2021-09-01',
      },
      {
        identificacion: '123456789',
        nombre: 'Arsecio Perez',
        direccion: 'Calle 1',
        correo: 'arsecioperez@gmail.com',
        fechaCreacion: '2021-09-01',
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
      cleinte.identificacion.toString().includes(input.value.toLowerCase()) ||
      cleinte.nombre.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.direccion.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.correo.toLowerCase().includes(input.value.toLowerCase())
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
