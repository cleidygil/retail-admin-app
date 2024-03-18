import { ReturnStatement } from '@angular/compiler';
import { Component, Inject, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  productsAll: any = []
  brands: any = []
  nextPage: number = 1;
  nextPageProd: number = 1;
  pageIndex: number = 10
  count: number = 0
  countProd: number = 0
  params = new FormGroup({
    search: new FormControl(''),
  })
  items: any = []
  brandsSelect = new FormGroup({
    brand: new FormControl(''),
  })
  valueForm: any[] = []


  constructor(
    public dialogRef: MatDialogRef<DialogSelectedProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.getBrands()

  }

  getAllProducts() {
    const params = new MyStoreParams()
    params.brands = this.brandsSelect.value?.brand || ''
    params.page = this.nextPage
    this.services.getAllProducts(params).then((result) => {
      this.productsAll = result.results
      this.countProd = result.count

    }).catch((err) => {
      console.log(err)
    });
  }


  getBrands() {
    const params = new BrandsParams()
    params.page = this.nextPage
    this.brandServices.getBrands(params).then((result) => {
      this.brands = result.results
      this.count = result.count
      this.pageIndex = Math.ceil(Number(result.count) / 10)
      console.log(this.pageIndex, 'page Index')
    }).catch((err) => {
    });
  }
  nextPageIndex() {
    if (this.nextPage < this.pageIndex) {
      this.nextPage = this.nextPage + 1
      this.getBrands()
      return
    }
  }
  prevPageIndex() {
    if (this.nextPage > 1) {
      this.nextPage = 1
      this.getBrands()
      return
    }
  }

  searchig(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.productsAll = filterValue.trim().toLowerCase()
  }
  nextPageIndexProducts(event: PageEvent) {
    this.nextPageProd = event.pageIndex + 1;
    this.getAllProducts()
  }
  onSubmit() {
    let limplio = this.valueForm.filter(item =>Number(item.count) > 0).map(item=> item)
    this.brandServices.productsArr.next(limplio)
    this.dialogRef.close(true)
  }
}

