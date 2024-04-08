export class EntryAndExit {
    page?: number
    status?: string
    store?: string
    supplier?: string
    created_at_since?: string
    created_at_until?: string
    created_by?: string
    finish_date_since?: string
    finish_date_until?: string
    purchase_order?: string
    search?: string
    type?: string
    remove_pagination?: string
    depot?: string
    inventory?: string
    depot_entry?: string
    inventory_entry?:string
    depot__store?: string
    inventory__store?: string
}

export interface WarehousesEandE {
    count: number
    next: any
    previous: any
    results: Entry[]
  }
  
  export interface Entry {
    id: number
    depot: number
    product_name: string
    depot_store_name: string
    inventory_store_name: string
    inventory: number
    add: boolean
    created_by: number
  }