import { ReturnStatement } from '@angular/compiler';
import { Component, Inject, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Brand, BrandsParams } from 'src/app/core/manage/interface/manege.interface';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import { SuppliesService } from 'src/app/core/supplies/services/supplies.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-dialog-selected-products',
  templateUrl: './dialog-selected-products.component.html',
  styleUrls: ['./dialog-selected-products.component.css']
})
export class DialogSelectedProductsComponent {
  private services = inject(SuppliesService)
  private brandServices = inject(ManageService)
  private snack = inject(SnackbarService)
  brands: any = []
  nextPage: number = 1;
  pageIndex: number = 10
  count: number = 0
  productsAll: any = []
  params = new FormGroup({
    search: new FormControl(''),
  })
  items: any = []
  brandsSelect = new FormGroup({
    brand: new FormControl(''),
  })
  constructor(
    public dialogRef: MatDialogRef<DialogSelectedProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.getBrands()
    this.getAllProducts()
  }

  getAllProducts() {
    const params = new MyStoreParams()
    this.services.getAllProducts(params).then((result) => {
      this.productsAll = result.results
    }).catch((err) => {
      console.log(err)
    });
  }
  getBrands() {
    const params = new BrandsParams()
    params.page = this.nextPage
    // params.store = this.store?.toString()
    this.brandServices.getBrands(params).then((result) => {
      this.brands = result.results
      this.count = result.count
      this.pageIndex = Math.ceil( Number(result.count) / 10 )
      console.log(this.pageIndex, 'page Index')
    }).catch((err) => {
    });
  }
  nextPageIndex() {
    if (this.nextPage < this.pageIndex) {
      console.log('next', this.nextPage)
      this.nextPage = this.nextPage + 1
      this.getBrands()
      return
    }
  }
  prevPageIndex() {
    if (this.nextPage > 1) {
      console.log('prev', this.nextPage)
      this.nextPage = 1
      this.getBrands()
      return
    }
    
  }
}
