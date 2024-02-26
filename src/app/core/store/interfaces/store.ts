
export interface Brands {
    count: number
    next: string
    previous: any
    results: Brand[]
  }
  
export interface Brand {
    id: number
    name: string
    image: string
    store: any
    store_name: any
  }
  


export class BrandsParams {
    search?:string
    page?: number
    status?:string
}


export class MyStoreParams {
  search?:string
  page?: number
  status?:string
  remove_pagination?: string
  parent?:string
}
export interface AllStores {
  count: number
  next: string
  previous: any
  results: AllStore[]
}

export interface AllStore {
  id: number
  rif: string
  name: string
  address: string
  phone: string
  parent?: number
  localphone: string
  description: string
  payment_methods: PaymentMethod[]
  currency?: number
  currency_name?: string
}

export interface PaymentMethod {
  id: number
  payment_method: number
  payment_method_name: string
  bank?: number
  bank_account?: string
  email?: string
}
export class MethosdParams{
  status?:string
  currency?:string
}
