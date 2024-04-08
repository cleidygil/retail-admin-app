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
  private activateRouter = inject(ActivatedRoute)
  id: number = 0
  sub!: Subscription
  create: boolean = false
  constructor(
    public dialogRef: MatDialogRef<DialogProductEgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.activateRouter.params.subscribe(data => {
      console.log(data['id'])
      this.id = data['id'] !== undefined ? Number(data['id']) : 0
    })
  }
  productsInfo!: FormGroup;
  options: any[] = []

  newOptions = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    console.log(this.data)
    if (this.id == 0) {
      this.productsInfo = this.formBuilder.group({
        product: new FormControl(''),
        available: new FormControl(''),
        options: new FormControl('', [Validators.required]),
        inventory_type: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      });
    } else {
      this.productsInfo = this.formBuilder.group({
        options: new FormControl('', [Validators.required]),
        available: new FormControl(''),
        product: new FormControl(''),
        quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      })
    }

    this.productsInfo.patchValue({
      product: this.data.product_name,
      available: this.data.quantity
    })
    this.getOptions()
  }
  getOptions() {
    const params: EntryAndExit = new EntryAndExit()
    params.remove_pagination = 'true'
    params.type = '1'
    this.services.getOptionsInventory(params).then((value) => {
      this.options = value
    }).catch((error) => {
      console.log(error)
    })
  }
  onSubmit() {
    const valor = this.productsInfo.value
    let body = {
      "store": this.services.idStore.value,
      "product": this.data.product,
      "quantity": Number(valor.quantity),
      option: valor.options,
      "inventory_type": this.id == 0 ? valor?.inventory_type : this.id,
    }
    this.servicesInv.patchInventoryTransaction(body).then((value) => {
      this.dialogRef.close(true)
      this.snack.openSnackBar("La operacion se ha realizado con exito!")
    }).catch((error) => {
      console.log(error)
      if (error.status == 400) {
        this.snack.openSnackBar(error.error.message)
      }
    })
    return
  }
  addOptions() {
    const valor = this.newOptions.value
    let body = {
      "name": valor.name,
      "store": this.services.user.store,
      "type": 1
    }
    console.log(body)
  }
}
