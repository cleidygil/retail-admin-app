import { Component, inject } from '@angular/core';
import { Ambient, Management } from '../../interface/manege.interface';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/global/services/loading.service';
import { ManageService } from '../../services/manege.service';
import { StoreService } from 'src/app/core/store/services/store.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';

@Component({
  selector: 'app-manage-environments',
  templateUrl: './manage-environments.component.html',
  styleUrls: ['./manage-environments.component.css']
})
export class ManageEnvironmentsComponent {
  private services = inject(ManageService)
  private storeServices = inject(StoreService)
  list:any[]=[]
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  ambientsForm = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.maxLength(200)]),
    'description': new FormControl(''),
    'store': new FormControl<any>('', [Validators.required]),
  })
  nextPage: number = 1;
  ambients: Ambient[] = []
  count: number = 1

  constructor(){
    this.getAllStore()
    this.getAllBranch()
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
  getAmbients(id:any=0) {
    const params: Management = new Management()
    params.page = this.nextPage
    params.store = id ==0?"":id
    this.services.getAmbients(params).then((result) => {
      this.ambients = result.results
      this.count = result.count
    }).catch((err) => {
    });
  }
}
