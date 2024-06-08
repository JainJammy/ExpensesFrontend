import { Reducer } from "redux";
import { AuthActions, IncomeActions } from "../action-types";
import { LoginActions } from "../action-types";
import { LoginState } from "../action-types";
import { AuthState } from "../action-types";
import { IncomeState } from "../action-types";
export const initialState:IncomeState={
    isincome:false,
    errors:""
}
const IncomeReducer:Reducer<IncomeState>=(state=initialState,action)=>{
    switch(action.type){
        case IncomeActions.SET_INCOME:{
          return{
            ...state,
            isincome:action.payload
          }           
        }
        case IncomeActions.SET_ERRORSTATE:{
            return{
                ...state,
                errors:action.payload
            }
        }
        default:{
            return state
        }
    }
};
export default IncomeReducer