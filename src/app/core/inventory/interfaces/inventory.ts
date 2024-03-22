export class Inventory {
    page?: number
    status?: string
    store?: string
    supplier?: string
    created_by?: string
    search?: string
    type?: string
    remove_pagination?: string
}

export interface InventoryRoot {
    count: number
    next: any
    previous: any
    results: InventoryRes[]
}

export interface InventoryRes {
    id: number
    product: number
    product_brand_name: string
    product_mu_name: string
    store: number
    store_name: string
    product_name: string
    quantity: number
    status: number
    status_name: string
    type: number
    type_name: string
    created_by: number
    created_by_name: string
    created_at: string
}
