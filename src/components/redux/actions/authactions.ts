import { Dispatch } from "redux"
import axios from "axios"
import { AuthActions } from "../action-types"
import { LoginActions } from "../action-types"
import { ExpenseActions } from "../action-types"
import { IncomeActions } from "../action-types"
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { error } from "console"

export const setIsAuthenticated=(isAuthenticated:any)=>({
    type:AuthActions.SET_ISAUTHENTICATED,
    payload:isAuthenticated
})
export const setLoginAuthenticated=(isLogin:any)=>({
    type:LoginActions.SET_ISLOGIN,
    payload:isLogin
})

export const setErrorstate=(error:any)=>({
    type:AuthActions.SET_ERRORSTATE,
    payload:error
})

export const setIsLoginErrorstate=(error:any)=>({
    type:LoginActions.SET_ERRORSTATE,
    payload:error
})

export const setExpenseActions=(isexpenseadded:any)=>({
        type:ExpenseActions.SET_EXPENSE,
        payload:isexpenseadded
})
export const setIncomeActions=(isincome:any)=>({
    type:IncomeActions.SET_INCOME,
    payload:isincome
})

export const setIncomeErrorstate=(error:any)=>({
    type:IncomeActions.SET_ERRORSTATE,
    payload:error
})

export const setExpenseErrorstate=(error:any)=>({
    type:ExpenseActions.SET_ERRORSTATE,
    payload:error
})

export const registeruserdata=(user:any)=>{
   return async(dispatch:Dispatch)=>{
    const resdata=await axios.post("http://localhost:8000/api/user/register/",user).then((res:any)=>{
        console.log("Jammy res was data",res.data)
        localStorage.setItem("accesstoken",res.data.token.access)
        localStorage.setItem("refrestoken",res.data.token.refresh)

        dispatch(setIsAuthenticated(true))
        
      
    }).catch((error:any)=>{
        console.log("Jerror",error.response)
       
        if(error.response && error.response.data && error.response.data.message && error.response.data.message.email)
            {
                const errorMessage = error.response.data.message.email[0];
                dispatch(setErrorstate(errorMessage))
            }
    })
   }
}
export const loginuserdata=(user:any)=>{
    return async(dispatch:Dispatch)=>{
        const resdata=await axios.post("http://localhost:8000/api/user/login/",user).then((res:any)=>{
            console.log("res was data",res.data)
            // Remove any existing tokens
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('refreshtoken');

            localStorage.setItem("accesstoken",res.data.token.access)
            localStorage.setItem("refrestoken",res.data.token.refresh)
           
            dispatch(setLoginAuthenticated(true))
          
        }).catch((error:any)=>{
            console.log("Jammy error",error.response)
            const errorMessage = error.response.data.message.email[0];
           
            dispatch(setIsLoginErrorstate(errorMessage))
        })
       } 
}


export const expenseaction=(user:any,token:any)=>{
    return async(dispatch:Dispatch)=>{
        const resdata=await axios.post("http://localhost:8000/api/user/expense/",user,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res:any)=>{
                  dispatch(setExpenseActions(true))
        }).catch((error:any)=>{
             console.log("error",error)
             
             if(error.response && error.response.data && error.response.data.message)
                {
                    const errormessage=error.response.data.message
                    dispatch(setExpenseErrorstate(errormessage))    
                }
        })
    }
}

export const Incomeaction=(user:any,token:any)=>{
    return async(dispatch:Dispatch)=>{
        const resdata=await axios.post("http://localhost:8000/api/user/income/",user,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res:any)=>{
                  dispatch(setIncomeActions(true))
        }).catch((error:any)=>{
             console.log("error",error)
             
             if(error.response && error.response.data && error.response.data.message)
                {
                    const errormessage=error.response.data.message
                    dispatch(setIncomeErrorstate(errormessage))    
                }
        })
    }
}

