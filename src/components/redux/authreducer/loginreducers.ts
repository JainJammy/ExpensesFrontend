import { Reducer } from "redux";
import { AuthActions } from "../action-types";
import { LoginActions } from "../action-types";
import { LoginState } from "../action-types";
import { AuthState } from "../action-types";
export const initialState:LoginState={
    isLogin:false,
    errors:""
}
const LoginReducer:Reducer<LoginState>=(state=initialState,action)=>{
    switch(action.type){
        case LoginActions.SET_ISLOGIN:{
          return{
            ...state,
            isLoginAuthenticated:action.payload
          }           
        }
        case LoginActions.SET_ERRORSTATE:{
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
export default LoginReducer