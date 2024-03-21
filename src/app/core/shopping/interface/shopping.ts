export class Shopping {
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
}

export interface PurchasesOrders {
    count: number
    next: any
    previous: any
    results: PurchasesOrder[]
  }
  
  export interface PurchasesOrder {
    id: number
    depot: boolean
    store: number
    store_name: string
    supplier: number
    supplier_name: string
    status: number
    status_name: string
    invoice_number?: number
    delivery_date: string
    finish_date?: string
    method_payment: number
    method_payment_name: string
    items_count: number
    created_by: number
    created_by_name: string
    created_at: string
  }
  
  export interface OrderItems {
    count: number
    next: string
    previous: string
    results: OrderItem[]
  }
  
  export interface OrderItem {
    id: number
    product: number
    product_name: string
    proudct_mu_name: string
    proudct_brand_name: string
    cost: string
    total_cost: string
    quantity: number
    quantity_available: string
    inventory_status: string
    created_at: string
  }
  export interface StatusOrder {
    id: number
    name: string
    description: string
    type: string
  }
  
  
