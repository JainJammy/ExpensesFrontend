export interface Registerdetails{
    email:string,
    password:any
}
export interface LoginUser{
    email:string,
    password:string
}
export interface Userinfo{
    username:string,
    email:string
}

export interface Expense{
    id:number,
    amount:number|any,
    date:string,
    description:string,
    email:string
}
export interface Summary{
    id:number,
    amount:number|any,
    date:string,
    description:string,
    email:string
}
export interface Income{
    id:number,
    amount:number|any,
    date:string,
    description:string,
    email:string
}
export interface Incometype{
    id:number,
    amount:number|any,
    date:string,
    description:string,
    email:string
}