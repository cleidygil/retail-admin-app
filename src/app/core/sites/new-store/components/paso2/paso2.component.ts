import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Methods, MethosdParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { SitesService } from '../../../services/sites.service';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css']
})
export class Paso2Component {
  @Output() value2 = new EventEmitter<any>()
  private services = inject(StoreService)
  private sitesServices = inject(SitesService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)


  methodsform = new FormGroup({
    methods_selected :new FormControl<string | number>('')
  })
  user = this.global.User()
  inputMethod: any = ''
  methods_arr: any[] = []
  methods:any
  ngOnInit(): void {
  
    if(this.sitesServices.paso2.value != null){
      let valor =  this.sitesServices.paso2.value
      this.methodsform.patchValue({
        methods_selected: valor.payment_method
      })
      this.inputMethod = valor.payment_method
    }
    this.getMethods()
    this.methodsform.valueChanges.subscribe(change=> {
      this.inputMethod = change.methods_selected
    })
  }
  getMethods() {
    const params: MethosdParams = new MethosdParams()
    this.services.getPaymentMethods(params).then((result) => {
      this.methods_arr = result
    }).catch((error) => {
      console.log(error) 
    })
  }

  onSubmit() {
    let body={
      payment_method: Number(this.inputMethod),
    }
    let body2 = {...body, ...this.methods}
    this.value2.emit(body2)
    this.sitesServices.paso2.next(body2)

  }
  changeReset(){
    this.sitesServices.paso2.next(null)
    this.value2.emit(null)
  }
}
