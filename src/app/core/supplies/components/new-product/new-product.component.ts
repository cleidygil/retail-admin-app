import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { SuppliesService } from '../../services/supplies.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  private services = inject(SuppliesService)
  private router = inject(Router)
  private snack = inject(SnackbarService)
  private router = inject(Router)
  private snack = inject(SnackbarService)
  private activateRou = inject(ActivatedRoute);
  sub!: Subscription
  id: number | null = null
  selectedFile: any = null;
  myFiles: any[] = [];
  format: any = [];
  accept: string = '.jpg,.png';
  archivoSeleccionado!: File;
  files = new FormGroup({
    file: new FormControl(''),
    url: new FormControl(''),
  })
  productSale:any
  image:string = ''
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
    ngOnInit(): void {

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
  convertirBase64AUrl(base64Data: string): string {
    console.log(base64Data)
    const byteCharacters = JSON.parse(window.atob(base64Data));
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Crear una URL a partir del blob
    const objectURL = URL.createObjectURL(blob);
    return objectURL;
  }
  deleteProducts(){
    this.services.deleteProducts(this.id).then((result) => {
      this.snack.openSnackBar("Producto creado exitosamente");
      this.router.navigate(['/home/supplies/products'])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }
  recibirDatos(datos: any) {
    this.productSale=datos
  }
}
