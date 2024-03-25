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
  
