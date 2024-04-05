import { Component,inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SuppliesService } from '../../../supplies/services/supplies.service';
@Component({
  selector: 'app-new-recipes',
  templateUrl: './new-recipes.component.html',
  styleUrls: ['./new-recipes.component.css']
})
export class NewRecipesComponent {
  files = new FormGroup({
    file: new FormControl(''),
    url: new FormControl(''),
  })
  private services = inject(SuppliesService)
  accept: string = '.jpg,.png';
  myFiles: any[] = [];
  format: any = [];
  selectedFile: any = null;
  image:string = ''
  id: number | null = null
  datosEnviados: any = {};
  sub!: Subscription
  datos: any = null;
  temporalInfoForms: any = null;
  private activateRou = inject(ActivatedRoute);

  constructor(){
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }

  ngOnInit(): void{
   this.actualizarDatosEnviados() 
  }
  seleccionarArchivo(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = reader.result as string;
      const dataUrl = event.target?.result as string
      const isImageType = file.type.startsWith('image/');
      let imageUrl: any
      if (isImageType) {
        this.myFiles = [{ name: file.name, imageData: result, preview: result }];
      } else {
        this.myFiles = [{ name: file.name, imageData: result, preview: null }];
      }
      const files = this.myFiles.map((file) => {
        return {
          name: file.name,
          image_data: file.imageData
        }
      })
      this.format = files
      this.actualizarDatosEnviados();
    };
    reader.readAsDataURL(file);
  }
  resetFile(indice: number): void {
    this.myFiles = this.myFiles.filter(
      (fil: string, i: number) => i !== indice
    );
    this.format = this.format.filter((fil: string, i: number) => i !== indice);
  }
  recibirDatos(datos: any) {
    this.temporalInfoForms = datos;
    this.actualizarDatosEnviados();
  }
  actualizarDatosEnviados() { 
    if(this.files.value.url!="") {
      const data = {
        infoForms: this.temporalInfoForms, 
        image:  this.files.value.url
      };
      this.datosEnviados = data;
    }else{
      const data = {
        infoForms: this.temporalInfoForms, 
        image: this.myFiles.length > 0 ? this.myFiles[0].imageData : this.temporalInfoForms.image
      };
      this.datosEnviados = data;
    }
  }
}
