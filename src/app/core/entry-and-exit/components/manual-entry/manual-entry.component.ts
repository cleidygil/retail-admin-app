import { Component, inject } from '@angular/core';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';
import { EntryAndExitService } from '../../services/entry-and-exit.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.css']
})
export class ManualEntryComponent {
  private shopServices = inject(ShoppingService)
  private services = inject(EntryAndExitService)
  private snack = inject(SnackbarService)
  paso1: boolean = true
  paso2: boolean = false
  pasoFinal: boolean = false
  value1: any
  value2: any
  valueEnd: any

  onSubmit() {
    const items: any = [];
    this.value2.map((valor: any) => {
      items.push({
        cost: valor.cost,
        quantity: valor.quantity,
        product: valor.product,
        purchase_order: null,
      });
    });
    const arr: any = [];
    this.value2.map((item: any) => {
      arr.push({
        id: item.id,
        quantity: item.quantity,
        cost: item.cost
      })
    })
    let body: any
    this.shopServices.getPurchasesOrdersID(this.value2[0].purchase_order).then((result) => {
       body = {
        ...this.value1,
        status: 4,
        supplier: result.supplier
      }
      this.shopServices.patchCostOrdersItems(arr).then((cost) => {
        this.shopServices.patchPurchasesOrders(body, result.id).then((res) => {
          this.valueEnd = result.id
          this.services.array.next([])
          this.services.paso1.next(null)
          this.snack.openSnackBar("Orden actualizada exitosamente")
          this.paso2 = !this.paso2
          this.pasoFinal = !this.pasoFinal
        }).catch((error) => {
          this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
        })
      }).catch((error) => {
        if (error.status == 400) {
          this.snack.openSnackBar(error.error?.cost ?? '')
          return
        }
        this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
        return
      })
    })
    }
}
