import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloTexto, validarCorreo, validarDecimalConDosDecimales } from 'src/app/validators/validatorFn';
import { ClientesService } from 'src/app/service/clientes.service';
@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css']
})
export class NuevoProveedorComponent {

  formulario: FormGroup;
  existe: boolean = false;
  constructor(private formBuilder: FormBuilder, private clientesService: ClientesService) {
    this.formulario = this.formBuilder.group({
      NIT: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(15)]],
      nombre: ['', [Validators.required, soloTexto()]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
  }

  onSubmit() {

    if (this.formulario.valid) {
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
    this.clientesService.enviarDatos(this.formulario.value).subscribe(response => {
      console.log('Datos enviados correctamente:', response);
      alert('Datos registrados correctamente');
      this.formulario.reset();
    }, error => {
      console.error('Error al enviar datos:', error);
      alert('Error al enviar datos: los campos no cumplen con los formatos requeridos');	
    });
  }

  validarCodigo(event: any) {
    const input = event.target as HTMLInputElement;
  
    // Eliminar cualquier validación anterior
    //this.formulario.get('codigo')!.setErrors(null);
    this.existe = false;
  
    const delay = 300;
  
    setTimeout(() => {
      this.clientesService.verificarExistencia(input.value).subscribe(data => {
        if ( parseInt(data.data) > 0 ) {	
          this.existe = true;
          console.log('El código ya existe', data.data);

          this.formulario.get('rucDni')!.setErrors({ 'codigoExistente': true });
        } else {
          this.formulario.get('rucDni')!.setErrors(null);
          this.existe = false;
        }
      });
    }, delay);
  }


  
}