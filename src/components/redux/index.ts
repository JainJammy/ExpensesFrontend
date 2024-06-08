import { AuthState } from "./action-types";
import { LoginState } from "./action-types";
import { ExpenseState } from "./action-types";
import { IncomeState } from "./action-types";
export interface ApplicationState{
    readonly auth:AuthState
    readonly login:LoginState
    readonly expense:ExpenseState
    readonly income:IncomeState
}