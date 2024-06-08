import React from "react";
import { FunctionComponent } from "react";
import HomePage from "@/src/components/layout/layoutpage";
interface IProps{
  children:any
}
const IndexPage:FunctionComponent<IProps>=({children}:IProps)=>{
  return(
    <>
    <HomePage>
      {children}
      </HomePage>
    </>
  )
}
export default IndexPage
