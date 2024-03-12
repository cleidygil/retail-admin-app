export class Shopping {
    page?:number
    status?:string
    store?:string
    supplier?:string
    created_at_since?:string
    created_by?:string
    finish_date_since?:string
    finish_date_until?:string
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
  
