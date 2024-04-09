import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepotService } from 'src/app/core/depot/services/depot.service';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { EntryAndExitService } from '../../services/entry-and-exit.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manual-egress',
  templateUrl: './manual-egress.component.html',
  styleUrls: ['./manual-egress.component.css']
})
export class ManualEgressComponent {
  private storeServices = inject(StoreService)
  private services = inject(EntryAndExitService)
  private depot = inject(DepotService)
  private dialog = inject(MatDialog)
  private global = inject(GlobalService)

  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  options = new FormGroup({
    store: new FormControl(''),
    search: new FormControl('')
  })
  ngOnInit(): void {
    this.getAllStore()
    this.getAllBranch()
    this.options.valueChanges.subscribe(data => {
      this.services.idStore.next(Number(data.store))
    })
  }

  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'false'
    params.search = this.options.value.search || ''
    this.storeServices.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      console.log(err)
    });
  }
  getAllBranch() {
    const params = new MyStoreParams()
    params.parent = 'true'
    params.search = this.options.value.search || ''

    this.storeServices.getUserStores(params).then((result) => {
      this.mybranch = result
    }).catch((err) => {
      console.log(err)
    });
  }
}
