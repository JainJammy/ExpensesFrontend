import React from "react";
import { FunctionComponent } from "react";
import { Layout } from "antd";
import HeaderMenu from "./HeaderMenu";
import SideMenu from "../../../app/SideMenu"
//import { useRouter } from "next/router";
const {Content}=Layout
interface IProps{
    children:any
}

const MainLayoutPage:FunctionComponent<IProps>=({children}:IProps)=>{
    //const router=useRouter()
    //router.push("/login")
    return(
        <>
        <Layout style={{height:'100%', minHeight:'100vh'}}>
            <HeaderMenu/>
            <Layout>
                <SideMenu></SideMenu>                
                <Content>{children}</Content>
            </Layout>
        </Layout>
        </>
    )
}
export default MainLayoutPage