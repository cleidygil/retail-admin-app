export interface Supplies {
}

export class ParamsGlobal{
    category?:string
    page?:number
    parent?:string
    search?:string
    remove_pagination?:string
}

export interface MeasurementUnits {
    count: number
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