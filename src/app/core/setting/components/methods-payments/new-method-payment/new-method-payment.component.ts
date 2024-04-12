import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SitesService } from 'src/app/core/sites/services/sites.service';
import { MethosdParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { Method } from '../../../interface/settings.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-new-method-payment',
  templateUrl: './new-method-payment.component.html',
  styleUrls: ['./new-method-payment.component.css']
})
export class NewMethodPaymentComponent {
  private services = inject(StoreService)
  private sitesServices = inject(SitesService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)
  private activateRou = inject(ActivatedRoute)
  private router = inject(Router)
  sub!: Subscription
  id: any | null = null
  store: any | null = null
  methodsform = new FormGroup({
    methods_selected: new FormControl<string | number>('')
  })
  user = this.global.User()
  methods_arr: any[] = []
  methods: Method | null = null
  inputMethod: any = ''

  constructor() {
    this.activateRou.params.subscribe(data => {
      this.store = Number(data['store'])
      this.id = Number(data['id']) 
    })
  }
  ngOnInit(): void {
    this.getMethods()
    this.methodsform.valueChanges.subscribe(change => {
      this.inputMethod = change.methods_selected
    })
    if(!isNaN(this.id)){
      this.methodsform.disable()
      this.getMethodID()
    }else{
      this.id=null
    }
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
    console.log(this.inputMethod)
    console.log("this.inputMethod")
    if (this.inputMethod == '5' || this.inputMethod == '4') {
      // methods ={
      //   payment_methods: [Number(this.inputMethod)],   
      //   method: true,
      //   bank: null,
      //   bank_account:null,
      //   email: null,
      //   identification: this.methods?.sender !=null? this.methods.sender :null
      // }
      // this.methods ={
      //   bank: "null",
      //   bank_account: 'null',
      //   email: 'null',
      //   sender: 'null',
      // }
     
    }
    var methods:any={}
    console.log(this.methods)
    console.log("this.methods")

    if(this.id!=null){
      const  methods ={
        store:this.store,
        payment_methods: Number(this.inputMethod),   
        bank: null,
        bank_account:null,
        email: Number(this.inputMethod)===5?this.methods?.email : null,
        identification:  this.methods?.sender !=null? this.methods.sender :null,
        sender:this.methods?.phone !=null? Number(this.methods?.phone) :null
      }
      this.services.patchPaymentMethods(methods, this.id).then((res) => {
        this.snack.openSnackBar("Metodo de pago actualizado con exito exitosamente")
        this.router.navigate(['/home/settings/methods_payments/'+this.store+'/method_store'])
      }).catch((error) => {
        const containsDuplicate = error.error.message.includes("Duplicate");
        if(containsDuplicate){
          this.snack.openSnackBar("El método de pago ya existe, por favor ingrese uno nuevo.")
        }else{
          this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
        }
      })
    }else{
      methods ={
        payment_methods:[Number(this.inputMethod)] ,   
        method: true,
        bank:  Number(this.inputMethod) ===5|| Number(this.inputMethod)===4 || Number(this.inputMethod)===3|| Number(this.inputMethod)===6?null:this.methods?.bank,
        bank_account: Number(this.inputMethod) ===5|| Number(this.inputMethod)===4 || Number(this.inputMethod)===3|| Number(this.inputMethod)===6?null:this.methods?.bank_account,
        email: Number(this.inputMethod)===5 ||Number(this.inputMethod)===6 ?this.methods?.email : null,
        identification: this.methods?.sender !=null? this.methods.sender :null,
        sender:this.methods?.phone !=null? Number(this.methods?.phone) :null
      }
      this.services.postMyStorePaymentMethods(methods, this.store).then((res) => {
        this.snack.openSnackBar("Metodo de pago agregado exitosamente")
        this.router.navigate(['/home/settings/methods_payments/'+this.store+'/method_store'])
      }).catch((error) => {
        const containsDuplicate = error.error.message.includes("Duplicate");
        if(containsDuplicate){
          this.snack.openSnackBar("El método de pago ya existe, por favor ingrese uno nuevo.")
        }else{
          this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
        }
      })
    }
  }
  deleteMethodID(){
    // let body = {
    //   payment_methods: [Number(this.inputMethod)],   
    //   method: false
    // }
    // let methods:any={}
    // if (this.inputMethod == '5' || this.inputMethod == '4') {
    //   this.methods ={
    //     bank: "null",
    //     bank_account: 'null',
    //     email: 'null',
    //     sender: 'null',
    //   }
    //    methods ={
    //     bank: null,
    //     bank_account:null,
    //     email: null,
    //     sender: null,
    //   }
    // }
    // let body2 = { ...body, ...methods }
    this.services.deletePaymentMethods(this.id).then((res) => {
      this.snack.openSnackBar("Metodo de pago eliminado exitosamente")
      this.router.navigate(['/home/settings/methods_payments/'+this.store+'/method_store'])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }
  changeReset() {
    this.sitesServices.paso2.next(null)
    this.methods = null
  }
  getMethodID(){
    this.services.getPaymentMethodsID(this.id).then((result) => {
      this.methodsform.patchValue({
        methods_selected:result.payment_method
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
