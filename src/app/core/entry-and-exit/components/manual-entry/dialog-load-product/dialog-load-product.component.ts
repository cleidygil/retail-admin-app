import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryAndExitService } from '../../../services/entry-and-exit.service';

@Component({
  selector: 'app-dialog-load-product',
  templateUrl: './dialog-load-product.component.html',
  styleUrls: ['./dialog-load-product.component.css']
})
export class DialogLoadProductComponent {
  private services = inject(EntryAndExitService)
  constructor(
    public dialogRef: MatDialogRef<DialogLoadProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  productsInfo = new FormGroup({
    quantity: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required])
  })
  onSubmit() {
    const Array: any[] = []
    const valor = this.productsInfo.value
    let body = {
      quantity: valor.quantity,
      cost: valor.cost,
      product: this.data.id,
      name: this.data.name,
      brand_name: this.data.brand_name,
      mu_name: this.data.mu_name,
      store: this.data.store,
      method:true
    }
    Array.push(body)
    this.services.array.next(Array)
    this.dialogRef.close(true)
  }
}
