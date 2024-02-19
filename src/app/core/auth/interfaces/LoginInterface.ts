export interface Login {
    email: string,
    password: string;
}


export interface Child {
    id: number;
    name: string;
    patch: string;
    parent: number;
}

export interface Menu {
    id: number
    name: string
    patch?: string
    icon: any
    parent: any
    device: string
    children: Child[];
}

export interface User {
    id: number
    name: string
    lastname: string
    identification: string
    phone: any
    email: string
    is_active: boolean
    permissions: any[]
    groups: string[]
    menus: Menu[]

}

export interface ReturnLogin {
    token: string
    user: User
    message: string
}

export interface Token {
    token: string
}