
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