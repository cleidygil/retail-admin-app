import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SitesService } from '../../../services/sites.service';

@Component({
  selector: 'app-paso-final',
  templateUrl: './paso-final.component.html',
  styleUrls: ['./paso-final.component.css']
})
export class PasoFinalComponent {
  @Output() valueEnd = new EventEmitter<any>()
  private siteServices = inject(SitesService)
  selectedFile: any = null;
  myFiles: any[] = [];
  format: any = [];
  accept: string = '.jpg,.png';
  archivoSeleccionado!: File;
  files = new FormGroup({
    file : new FormControl(''),
  })
ngOnInit(): void {
  // this.files.valueChanges.subscribe(change=>{
  //   console.log(change)
  //   let body = {
  //     image: this.myFiles
  //   }
  //   console.log(body)
  //   this.siteServices.pasoFinal.next(body)
  //   this.valueEnd.emit(body)
  //   })
}
  seleccionarArchivo(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const isImageType = file.type.startsWith('image/');

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
    };
    reader.readAsDataURL(file);
  }
  resetFile(indice: number): void {
    this.myFiles = this.myFiles.filter(
      (fil: string, i: number) => i !== indice
    );
    this.format = this.format.filter((fil: string, i: number) => i !== indice);
  }
  onSubmit() {
    let body = {
      image_name: this.selectedFile.name,
      image: this.myFiles
    }
    this.siteServices.pasoFinal.next(body)
    this.valueEnd.emit(body)
  }
}
