import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { NotificationDialogComponent } from 'src/app/global/components/notification-dialog/notification-dialog.component';
import { LoadingService } from 'src/app/global/services/loading.service';
import { ManageService } from '../../../services/manege.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { PageEvent } from '@angular/material/paginator';
import { Ambient, Management } from '../../../interface/manege.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/global/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-manage-environments',
  templateUrl: './new-manage-environments.component.html',
  styleUrls: ['./new-manage-environments.component.css']
})
export class NewManageEnvironmentsComponent {
  private services = inject(ManageService)
  private storeServices = inject(StoreService)
  private loading = inject(LoadingService)
  private router = inject(Router)
  private snack = inject(SnackbarService)
  private dialog = inject(MatDialog)
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  ambientsArr: any[] = []
  nextPage: number = 1;
  count: number = 1
  ambients: Ambient[] = []

  ambientsForm = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.maxLength(200)]),
    'description': new FormControl(''),
    'store': new FormControl<any>('', [Validators.required]),
  })
  ngOnInit(): void {
    this.getAmbients()
    this.getAllStore()
    this.getAllBranch()
  }


  getAmbients() {
    const params: Management = new Management()
    params.page = this.nextPage
    params.store = this.ambientsForm.value.store || ''

    this.services.getAmbients(params).then((result) => {
      this.ambients = result.results
      this.count = result.count
    }).catch((err) => {
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getAmbients()
  }
  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'false'
    this.storeServices.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      console.log(err)
    });
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
  addAmbients() {
    this.ambientsForm.patchValue({
      description: this.ambientsForm.value.name
    })
    this.ambientsArr.push({
      ...this.ambientsForm.value,
    })
    this.ambientsForm.reset()
  }
  deleteSub(i: number) {
    this.ambientsArr = this.ambientsArr.filter((item: any, index: number) => index != i).map((item: any) => item)
  }
  onSubmit() {
    this.ambientsArr.map((body) => {
      this.services.postAmbients(body).then((result) => {
        this.router.navigate(['./manage_environments'])
        this.getAmbients()
        this.snack.openSnackBar("Ambiente creado con exito!")
        this.ambientsArr = []
      }).catch((error) => {
        this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
      })
    })
  }
  delete(i: number) {
    const dialogo = this.dialog.open(ConfirmDialogComponent, {
      data: { message: "¿Seguro que quieres eliminar este ítems?" }
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.services.deletehAmbientID(i).then((value) => {
          this.snack.openSnackBar("Items eliminadao con exito.")
        }).catch((error) => {
          this.snack.openSnackBar(error.errror.message)
        })

      }
    })
  }
}
