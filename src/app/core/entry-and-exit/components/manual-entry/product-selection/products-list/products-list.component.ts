import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  @Input() product: any
  // ngOnInit(): void {
  //   console.log(this.product, 'product')
  // }
}
