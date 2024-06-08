import { Reducer } from "redux";
import { ExpenseActions } from "../action-types";
import { ExpenseState } from "../action-types";
export const initialState:ExpenseState={
    isexpenseadded:false,
    errors:"",
}
const ExpenseReducer:Reducer<ExpenseState>=(state=initialState,action)=>{
    switch(action.type){
        case ExpenseActions.SET_EXPENSE:{
          return{
            ...state,
            isexpenseadded:action.payload
          }           
        }
        case ExpenseActions.SET_ERRORSTATE:{
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
export default ExpenseReducer