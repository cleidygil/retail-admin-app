import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryAndExitService } from '../../../services/entry-and-exit.service';
import { InventoryService } from 'src/app/core/inventory/services/inventory.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { EntryAndExit } from '../../../interfaces/entry-and-exit';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-product-egress',
  templateUrl: './dialog-product-egress.component.html',
  styleUrls: ['./dialog-product-egress.component.css']
})
export class DialogProductEgressComponent {
  private servicesInv = inject(InventoryService)
  private snack = inject(SnackbarService);
  private services = inject(EntryAndExitService)
  private formBuilder = inject(FormBuilder)
  id: number = 0
  create: boolean = false
  constructor(
    public dialogRef: MatDialogRef<DialogProductEgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any, type: any },
  ) {
  }

  productsInfo!: FormGroup;
  options: any[] = []
  optionsArr: any[] = []
  newOptions = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })
  ambientsForm = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.maxLength(200)]),
    'description': new FormControl(''),
    'store': new FormControl<any>('', [Validators.required]),
  })

  ngOnInit(): void {
    this.productsInfo = this.formBuilder.group({
      options: new FormControl<any>('', [Validators.required]),
      available: new FormControl(''),
      product: new FormControl(''),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    })
    this.productsInfo.patchValue({
      product: this.data.item.product_name,
      available: this.data.item.quantity
    })
    this.getOptions()
  }
  getOptions() {
    const params: EntryAndExit = new EntryAndExit()
    params.remove_pagination = 'true'
    params.type = '2'
    this.services.getOptionsInventory(params).then((value) => {
      this.options = value
      this.optionsArr = value
    }).catch((error) => {
      console.log(error)
    })
  }
  onSubmit() {
    const valor = this.productsInfo.value
    let body = {
      ...this.data.item, 
      quantity: Number(valor.quantity),
      option: valor.options?.id,
      option_name: valor.options?.name,
      depot: this.data.type == null ? this.data.item.id : null,
      inventory: this.data.type != null ? this.data.item.id : null,
      description: '',
    }
    this.services.loadProduct.next(body)
    this.dialogRef.close(true)
    // this.servicesInv.patchInventoryTransaction(body).then((value) => {
    //   this.dialogRef.close(true)
    //   this.snack.openSnackBar("La operacion se ha realizado con exito!")
    // }).catch((error) => {
    //   console.log(error)
    //   if (error.status == 400) {
    //     this.snack.openSnackBar(error.error.message)
    //   }
    // })
    // return
  }
  addOptions() {
    const valor = this.newOptions.value
    let body = {
      "name": valor.name,
      "store": this.services.user.store,
      "type": 1
    }

    this.services.postOptions(body).then((res) => {
      this.snack.openSnackBar("Opcion agreda con exito!");
      this.getOptions()
      this.newOptions.reset()
    }).catch((error) => {
      console.log(error)
      if (error.status == 400) {
        this.snack.openSnackBar(error.error.message)
      }
    })
  }
  deleteSub(i: number) {
    this.optionsArr = this.optionsArr.filter((item: any, index: number) => index != i).map((item: any) => item)
  }
}
