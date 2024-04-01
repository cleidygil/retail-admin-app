import { Component, Inject, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AllStore, MyStoreParams } from '../../../interfaces/supplies';
import { SuppliesService } from '../../../services/supplies.service';

@Component({
  selector: 'app-dialog-detail-recipes',
  templateUrl: './dialog-detail-recipes.component.html',
  styleUrls: ['./dialog-detail-recipes.component.css']
})
export class DialogDetailRecipesComponent {
  private dialog = inject(MatDialog)
  private services = inject(SuppliesService)
  mystores: AllStore[] = []
  params = new FormGroup({
    costSale: new FormControl(''),
    detail: new FormControl(''),
  })
  constructor(
    public dialogRef: MatDialogRef<DialogDetailRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){  }
  nInit(): void {
    this.getAllStore()
  }
  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'false'
    this.services.getUserStores(params).then((result) => {
      // this.loading.hideLoading()
      this.mystores = result
    }).catch((err) => {
      // this.loading.hideLoading()
    });
  }
  editRecipes(){
    this.dialogRef.close(true);
  }
}
