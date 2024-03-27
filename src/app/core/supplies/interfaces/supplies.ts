export interface Supplies {
}

export class ParamsGlobal {
  category?: string
  page?: number
  parent?: string
  search?: string
  type?:number
  remove_pagination?: string
}

export interface MeasurementUnits {
    next: string
    previous: string
    results: MeasurementUnit[]
  }
  
  export interface MeasurementUnit {
    id: number
    name: string
    abbreviation: string
    value: string
    equivalence: number
    image: string
    store: number
    store_name: string
  }
  export interface Categories {
    count: number
    next: string
    previous: string
    results: Category[]
  }
  
  export interface Category {
    id: number
    name: string
    description: string
    image: string
    parent: number
    parent_name: string
    store: number
    store_name: string
    status: boolean
  }
  export interface Products {
    count: number
    next: any
    previous: any
    results: Product[]
  }
  
  export interface Product {
    id: number
    name: string
    description: string
    sku: any
    authorization: boolean
    image: string
    mu: number
    mu_name: string
    subcategory: number
    subcategory_name: string
    category_name?: string
    store: number
    store_name: string
    created_by: number
    created_by_name: string
    created_at: string
  }
  
  export interface ProductId {
    id: number
    name: string
    description: string
    sku: any
    authorization: boolean
    image: string
    mu: number
    mu_name: string
    subcategory: Subcategory
    store: Store
    created_by: number
    created_by_name: string
    created_at: string
  }
  
  export interface Subcategory {
    id: number
    name: string
    description: string
    image: string
    parent: number
    parent_name: string
    store: any
    store_name: any
    status: boolean
  }
  
  export interface Store {
    id: number
    rif: any
    name: string
    address: string
    phone: string
    parent: number
    localphone: string
    description: string
    payment_methods: PaymentMethod[]
    currency: any
    currency_name: any
  }
  
  export interface PaymentMethod {
    id: number
    payment_method: number
    payment_method_name: string
    bank: any
    bank_account: any
    sender: any
    email: string
  }

export interface Recipes {
  count: number,
  next: String,
  previus: String,
  results: Recipe[]
}

export interface Recipe {
  id: number,
  name: String,
  price: String,
  first_price: String,
  last_price: String,
  serial: String,
  detail: String,
  image: String,
  is_base_recipe: boolean,
  category: number,
  category_name: Store,
  tax: number,
  tax_name: String,
  created_by: number,
  created_at: String
}
export interface Tax {
  id: number,
  store: number,
  store_name: String,
  name: String,
  acronym: String,
  percentage: String,
  status: boolean
}
export interface ParamsTax {

}

  export interface Recipe{
    id:number,
    name:String, 
    price: String,
    first_price:String,
    last_price:String,
    serial:String,
    detail:String,
    image:String,
    is_base_recipe:boolean,
    category: number,
    category_name:Store,
    tax:number,
    tax_name:String,
    created_by:number,
    created_at:String
  }
  export interface Tax{
    id:number,
    store:number,
    store_name:String,
    name:String,
    acronym:String,
    percentage:String,
    status:boolean
  }
 
  
