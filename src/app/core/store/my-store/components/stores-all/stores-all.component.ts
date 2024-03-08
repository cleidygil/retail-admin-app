import { Component, inject } from '@angular/core';
import { AllStore, MyStoreParams } from '../../../interfaces/store';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-stores-all',
  templateUrl: './stores-all.component.html',
  styleUrls: ['./stores-all.component.css']
})
export class StoresAllComponent {
  private brandServices = inject(StoreService)
  private loading = inject(LoadingService);
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  params = new FormGroup({
    search: new FormControl(''),
    status: new FormControl('')
  })
  ngOnInit(): void {
    this.loading.showLoading()
    this.getAllStore()
    this.getAllBranch()
  }

  getAllStore() {
   
    const params = new MyStoreParams()
    params.parent = 'false'

    this.brandServices.getUserStores(params).then((result) => {
      this.loading.hideLoading()
      this.mystores = result
      // this.mybranch = result.filter(e => e.parent != null).map(e => e)

    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  getAllBranch() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.brandServices.getUserStores(params).then((result) => {
      this.loading.hideLoading()
      this.mybranch = result

    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  

}
