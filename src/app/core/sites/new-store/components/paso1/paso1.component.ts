import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MethosdParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { SitesService } from '../../../services/sites.service';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css']
})
export class Paso1Component {
  @Output() value1 = new EventEmitter<any>()
  private services = inject(SitesService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)

  storeForm = new FormGroup({
    'rif': new FormControl('', [Validators.required]),
    'name': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    'phone': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('[0-9]*')]),
    'localphone': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('[0-9]*')]),
    'description': new FormControl('', [Validators.required]),
    'currency': new FormControl('', [Validators.required])
  })

  user = this.global.User()
  methods_arr: any[] = []
  payment_methods_arr: any[] = []
  payment_methods: any[] = []
  bank_arr: any[] = []

  ngOnInit(): void {
    if(this.services.paso1.value != null){
      let valor =  this.services.paso1.value
      this.storeForm.patchValue({
        rif: valor?.rif,
        name: valor?.name,
        address: valor?.address,
        phone: valor?.phone,
        localphone: valor?.localphone,
        description: valor?.description,
        currency: valor?.currency?.toString()
      })
    }
  }

  onSubmit() {
    const valor = this.storeForm.value
    let body = {
      "rif": valor.rif,
      "name": valor.name,
      "address": valor.address,
      "phone": valor.phone,
      "parent": this.user.store,
      "localphone": valor.localphone,
      "description": valor.description,
      "currency": valor.currency
    }
    this.value1.emit(body)
    this.services.paso1.next(body)
  }
}
