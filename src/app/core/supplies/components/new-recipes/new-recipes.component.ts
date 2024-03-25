import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  accept: string = '.jpg,.png';
  myFiles: any[] = [];
  format: any = [];
  selectedFile: any = null;
  image:string = ''
  id: number | null = null




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
        //  imageUrl = this.convertirBase64AUrl(dataUrl);
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
}
