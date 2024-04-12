import { Component , Inject,Input, ViewChild, inject,Output,EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogQuantityUnitOfMeasurementComponent } from '../../dialog-quantity-unit-of-measurement/dialog-quantity-unit-of-measurement.component';
import {DialogBranchRecipesComponent} from '../../dialog-branch-recipes/dialog-branch-recipes.component'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-selected-ingredients',
  templateUrl: './selected-ingredients.component.html',
  styleUrls: ['./selected-ingredients.component.css']
})
export class SelectedIngredientsComponent {
  private dialog = inject(MatDialog)
  private snack = inject(SnackbarService)
  private router = inject(Router)
  private activateRou = inject(ActivatedRoute);
  @Input() info: any;
  @Input() selectProducts: any[] =[];
  @Input() sendProducts: any[] =[];
  @Input() infoForms: any;
  @Input() listStore: any;
  @Input() costTotal:any
  @Output() costTotalChange = new EventEmitter<number>();

  senRecipes:any[]= []
  deleteProduct:any[]=[]
  sub!: Subscription
  id: number | null = null

  constructor(){
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
  ngOnInit(): void {

  }
  addQuantify(id:number){
    const dialogo = this.dialog.open(DialogQuantityUnitOfMeasurementComponent,{
      data:id,
      width: window.innerWidth >100 ? '300px':'auto',
    })
    dialogo.afterClosed().subscribe(data =>{
      if(data){
        // console.log(data)
        // console.log("data")
        const productoAModificar = this.sendProducts.find(item =>item.product ===data.id)
        if(productoAModificar.quantity ==0){
          this.costTotal += productoAModificar.price *data.quantity ;
        }else{
          this.costTotal -= productoAModificar.price *productoAModificar.quantity
          this.costTotal += productoAModificar.price *data.quantity ;
        }
        productoAModificar.quantity = data.quantity 
        this.costTotalChange.emit(this.costTotal);  

        // console.log(productoAModificar)
        // console.log("productoAModificar")

        // console.log(data.quantity)
        // console.log(data.price)

        // console.log(data.price *data.quantity)
        // console.log("data.price *data.quantity")
      }
    })
  }
  deleteProducts(index: number){
    this.selectProducts.splice(index,1)
    const data = this.sendProducts[index]
    const foundIndex = this.deleteProduct.findIndex(item => item.id === data.id);
    if(foundIndex === -1 && this.id!=null){
      this.deleteProduct.push(data)
    }
    this.costTotal -=  data?.price ? parseFloat(data.price) * data?.quantity : 0;
    // this.sendProducts.splice(foundIndex, 1);
    this.costTotalChange.emit(this.costTotal);
    this.sendProducts.splice(index,1)
  }
  selectBranch(): void {
    const { infoForms } = this.infoForms;
    const { nameRecipe, category, costSale, description } = infoForms ?? {};
    const foundIndex = this.sendProducts.some(item => item.quantity === 0)
      if (this.infoForms.image ==="" || this.infoForms.image ===undefined || this.infoForms.image ===null) {
      this.snack.openSnackBar("Por favor seleccionar una imagen.");
    } else if (!nameRecipe) {
      this.snack.openSnackBar("Por favor escribir un nombre.");
    } else if (!category) {
      this.snack.openSnackBar("Por favor escribir una categoria.");
    } else if (!costSale) {
      this.snack.openSnackBar("Por favor escribir el precio.");
    } else if (!description) {
      this.snack.openSnackBar("Por favor escribir la descripción.");
    } else if (this.sendProducts.length === 0) {
      this.snack.openSnackBar("Por favor seleccionar un producto para la receta.");
    }else if (foundIndex) {
      this.snack.openSnackBar("Por favor agregarle la cantidad a algunos de los productos.");
    } else if (this.costTotal>this.infoForms.costSale) {
      this.snack.openSnackBar("El costo total de producción no puede ser mayor al costo de venta, por favor validar.");
    }else {
      this.openDialog();
    }
  }
  
  openDialog(): void {
    const body = {
      infoForms: this.infoForms,
      products: this.sendProducts,
      id:this.id,
      deleteProduct:this.deleteProduct,
      listStore: this.listStore
    };
    const dialog = this.dialog.open(DialogBranchRecipesComponent, {
      data: body,
      width: window.innerWidth > 100 ? '500px' : 'auto'
    });
  
    dialog.afterClosed().subscribe(data => {
      if (data) {
        this.handleDialogClose(data);
      }
    });
  }
  
  handleDialogClose(data: any): void {
    this.snack.openSnackBar(data);
    this.router.navigate(['/home/supplies/recipes']);
  }
}
