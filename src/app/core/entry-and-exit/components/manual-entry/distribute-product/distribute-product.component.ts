import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DialogProductDistributionComponent } from 'src/app/core/depot/components/warehouses/dialog-product-distribution/dialog-product-distribution.component';
import { OrderItem, Shopping } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';

@Component({
  selector: 'app-distribute-product',
  templateUrl: './distribute-product.component.html',
  styleUrls: ['./distribute-product.component.css']
})
export class DistributeProductComponent {
  @Input() valueEnd:any
   private services = inject(ShoppingService)
   private dialog = inject(MatDialog)
   nextPageProd: number = 1;
   pageIndexProd: number = 10
   countProd: number = 0
   form = new FormGroup({
    search: new FormControl(''),
  })
  orderItems: OrderItem[] = []
  ngOnInit(): void {
   
    this.getOrderItems()
  }
  getOrderItems() {
    const valor = this.form.value
    const params: Shopping = new Shopping()
    params.purchase_order = this.valueEnd
    params.page = this.nextPageProd
    params.search = valor.search || ''
    this.services.getPurchasesOrdersItems(params).then((result) => {
      this.orderItems = result.results
      this.countProd = result.count
    })
  }
  nextPageIndexProducts(event: PageEvent) {
    this.nextPageProd = event.pageIndex + 1;
    this.getOrderItems()
  }
  openChangeStatus(item: any) {
    const dialogo = this.dialog.open(DialogProductDistributionComponent, {
      data: item,
      width: window.innerWidth > 430 ? '40%' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getOrderItems()
      }
    })
  }
}
