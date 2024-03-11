import { Component, Input, inject } from '@angular/core';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';

@Component({
  selector: 'app-my-branchs',
  templateUrl: './my-branchs.component.html',
  styleUrls: ['./my-branchs.component.css']
})
export class MyBranchsComponent {
  @Input() ruta: string = ''
  newUrl: string = ''
  constructor() { }

  private servicesStore = inject(StoreService);
  mystores: AllStore[] = []

  ngOnInit(): void {
    this.getAllStore()
  }

  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.servicesStore.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      console.log(err)
    });
  }

  check(id: any): void {
    return this.ruta != '' ?(id +'/'+ this.ruta) : id
  }
}
