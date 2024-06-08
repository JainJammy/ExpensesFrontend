"use client";
import { Provider } from "react-redux";
import configureStore from "../redux/store";
import { FunctionComponent } from "react";
interface IProps{
    children:any
}
const store=configureStore()
const Providers:FunctionComponent<IProps>=({children})=>{
     return(
        <>
        <Provider store={store}>
            {children}
        </Provider>
        </>
     )
}

export default Providers