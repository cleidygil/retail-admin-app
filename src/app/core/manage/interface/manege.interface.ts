export class Management {
  search?: string
  page?: number
  status?: string
  remove_pagination?: string
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
}

export interface Taxes {
  userId: number
  id: number
  title: string
  completed: boolean
}
