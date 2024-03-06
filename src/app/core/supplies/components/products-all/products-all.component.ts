import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { SuppliesService } from '../../services/supplies.service';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';

@Component({
  selector: 'app-products-all',
  templateUrl: './products-all.component.html',
  styleUrls: ['./products-all.component.css']
})
export class ProductsAllComponent {
  private services = inject(SuppliesService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)
  private router = inject(Router)
  constructor() { }
  productsAll: any = []
  ngOnInit(): void {
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
}
