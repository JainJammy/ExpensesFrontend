import { combineReducers } from "redux";
import  AuthRegisterReducer  from "./authreducer/authreducers";
import LoginReducer from "./authreducer/loginreducers";
import ExpenseReducer from "./authreducer/expensereducer";
import IncomeReducer from "./authreducer/incomereducers";
const rootReducer=combineReducers({
    auth:AuthRegisterReducer,
    loginauth:LoginReducer,
    expenseauth:ExpenseReducer,
    incomeauth:IncomeReducer
})

export default rootReducer