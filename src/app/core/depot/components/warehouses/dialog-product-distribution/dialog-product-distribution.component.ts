import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepotService } from '../../../services/depot.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { InventoryService } from 'src/app/core/inventory/services/inventory.service';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';

@Component({
  selector: 'app-dialog-product-distribution',
  templateUrl: './dialog-product-distribution.component.html',
  styleUrls: ['./dialog-product-distribution.component.css']
})
export class DialogProductDistributionComponent {
  private snack = inject(SnackbarService);
  private services = inject(InventoryService)
  private storeServices = inject(StoreService)
  private formBuilder = inject(FormBuilder)
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogProductDistributionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  mybranch: AllStore[] = []

  ngOnInit(): void {  
    if (this.data.store == undefined) {
      this.getAllBranch()
      this.form = this.formBuilder.group({
        available: new FormControl(''),
        rawmaterial: new FormControl('', [Validators.required, Validators.min(0)]),
        sales: new FormControl('', [Validators.required, Validators.min(0)]),
        store: new FormControl('', [Validators.required])
      });
    }else{
      this.form = this.formBuilder.group({
        available: new FormControl(''),
        rawmaterial: new FormControl('', [Validators.required, Validators.min(0)]),
        sales: new FormControl('', [Validators.required, Validators.min(0)]),
      })
    }

    this.form.patchValue({
      available: this.data.quantity
    })
  }
 
  onSubmit() {
    const valor = this.form.value
    if (valor.rawmaterial != '') {
      let material = {
        "store": this.data.store || valor.store,
        "product": this.data.product,
        "quantity": Number(valor.rawmaterial),
        "inventory_type": 2,
        option:null

      }
      this.services.patchInventoryTransaction(material).then((value) => {
        this.snack.openSnackBar("Operacion realizada exitosamente")
        this.dialogRef.close(true)
      }).catch((error) => {
        console.log(error)
        this.snack.openSnackBar("Ocurrio un error, asegurese que los datos sean correctos!")
      })
    }
    if (valor.sales != '') {
      let material = {
        "store": this.data.store || valor.store,
        "product": this.data.product,
        "quantity": Number(valor.sales),
        "inventory_type": 1,
        option:null

      }
      this.services.patchInventoryTransaction(material).then((value) => {
        this.snack.openSnackBar("Operacion realizada exitosamente")
        this.dialogRef.close(true)
      }).catch((error) => {
        console.log(error)
        this.snack.openSnackBar("Ocurrio un error, asegurese que los datos sean correctos!")
      })
    }
  }
  getAllBranch() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.storeServices.getUserStores(params).then((result) => {
      this.mybranch = result
    }).catch((err) => {
      console.log(err)
    });
  }
}
