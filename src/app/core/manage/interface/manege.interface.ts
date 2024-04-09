export class Management {
  search?: string
  page?: number
  status?: string
  remove_pagination?: string
  category?: string
  parent?: string
  store?: string
  type?: string
  tables?:boolean
}


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
  search?: string
  page?: number
  status?: string
  store?: string
  remove_pagination?: string

}

export interface Taxes {
  userId: number
  id: number
  title: string
  completed: boolean
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
export interface Ambients {
  count: number
  next: string
  previous: string
  results: Ambient[]
}

export interface Ambient {
  id: number
  name: string
  description: string
  store: number
  store_name: string
  status: boolean
  created_by: number
  created_by_name: string
  created_at: string
}
export interface Tables {
  count: number
  next: string
  previous: string
  results: Table[]
}

export interface Table {
  id: number
  number: number
  store: number
  store_name: string
  status: number
  status_name: string,
  ambient_name:string
}
