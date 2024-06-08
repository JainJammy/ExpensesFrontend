"use client"
import React, { FunctionComponent } from "react"
import {Col,Layout,Row} from 'antd';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Userinfo } from "../interfaces/interface";
import { UserOutlined } from "@ant-design/icons";
const {Header}=Layout
const HeaderMenu:FunctionComponent=()=>{
const[userinfo,setuserinfo]=useState<Userinfo>()
useEffect(()=>{
     const fetchUserinfo=async()=>{
        try{
            const accessToken=localStorage.getItem("accesstoken")
            if(!accessToken){
                console.error("Access token is missing")
                return;
            }
            const response=await axios.get("http://localhost:8000/api/user/info/",{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            });
            if(response.status==200){
                console.log("Header Menu response data",response.data)
                setuserinfo(response.data)
            }else{
                console.error("Failed to fetch user info")
            }
        }catch(error){
            console.error("Something went wrong")
        }
     }
     fetchUserinfo()
},[])
    return(
        <>
        <Header className="menu-header">
            <Row>
                <Col lg={12} sm={6} md={6} xl={12}>
                     <span className="header-text">
                        Expenses Application
                     </span>
                </Col>

                <Col span={6} offset={6}>
                     <span className="useroutlinedtext">
                        <UserOutlined/>{userinfo?.email}
                     </span>
                </Col>
            </Row>
        </Header>
        </>
    )
}
export default HeaderMenu