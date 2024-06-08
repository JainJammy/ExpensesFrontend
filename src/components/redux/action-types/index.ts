export interface AuthState{
    isAuthenticated:boolean|any
    errors:string|any
}
export interface LoginState{
    isLogin:boolean|any
    errors:string|any
}
export enum AuthActions{
    SET_ISAUTHENTICATED="SET_ISAUTHENTICATED",
    SET_ERRORSTATE="SET_ERRORSTATE"    
}
export enum LoginActions{
    SET_ISLOGIN="SET_ISLOGIN",
    SET_ERRORSTATE="SET_ERRORSTATE"
}
export interface ExpenseState{
    isexpenseadded:boolean|any,
    errors:string|any
}
export enum ExpenseActions{
    SET_EXPENSE="SET_EXPENSE",
    SET_ERRORSTATE="SET_ERRORSTATE"
}
export interface IncomeState{
    isincome:boolean|any,
    errors:string|any
}
export enum IncomeActions{
       SET_INCOME="SET_INCOME",
       SET_ERRORSTATE="SET_ERRORSTATE"   
}