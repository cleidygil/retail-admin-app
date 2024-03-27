export class Depot {
    page?:number
    status?:string
    store?:string
    supplier?:string
    created_at_since?:string
    created_at_until?:string
    created_by?:string
    finish_date_since?:string
    finish_date_until?:string
    purchase_order?:string
    search?:string
    type?:string
    remove_pagination?:string
    depot?:string
}

export interface Warehouses {
    count: number
    next: string
    previous: string
    results: Warehouse[]
  }
  
  export interface Warehouse {
    id: number
    quantity: number
    quantity_initial: string
    product: number
    product_name: string
    cost: string
    store: number
    store_name: string
    updated_by: string
  }
  export interface TransfersHistory {
    count: number
    next: any
    previous: any
    results: TransferHistory[]
  }
  
  export interface TransferHistory {
    id: number
    depot_send: number
    depot_send_store_name: string
    depot_receive: number
    depot_receive_store_name: string
    product_name: string
    product_brand_name: string
    product_mu_name: string
    quantity: number
    description: string
    created_at: string
    created_by: number
    created_by_name: string
  }
