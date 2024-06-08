import { Reducer } from "redux";
import { AuthActions } from "../action-types";
import { AuthState } from "../action-types";
export const initialState:AuthState={
    isAuthenticated:false,
    errors:""
}
const AuthRegisterReducer:Reducer<AuthState>=(state=initialState,action)=>{
    switch(action.type){
        case AuthActions.SET_ISAUTHENTICATED:{
          return{
            ...state,
            isAuthenticated:action.payload
          }           
        }
        case AuthActions.SET_ERRORSTATE:{
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
export default AuthRegisterReducer