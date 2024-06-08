"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import UserRegistration from "@/src/components/RegisterPage/UserRegister";
//import PrivateRoute from "@/src/components/PrivateRoute";
import PrivateRoute from "@/src/components/common/Privateroute";
import { isTokenExpired } from "@/src/components/common/utils";
import MainLayoutPage from "@/src/components/common/MainLayout";
import { Spin } from "antd";
interface IProps{
  children:any
}
const HomePage: FunctionComponent<IProps>= ({children}:IProps) => {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkToken=()=>{
    const accessToken = localStorage.getItem("accesstoken");
    const refreshToken = localStorage.getItem("refreshtoken");
    const accessTokencheck=isTokenExpired(accessToken)
    console.log("Access token check value",accessTokencheck)
    const refreshTokencheck= isTokenExpired(refreshToken)
    if (!accessTokencheck || !refreshTokencheck) {
      setHasToken(true);
      setLoading(false)
    }else {
      setHasToken(false);
      setLoading(false)
    }
}
checkToken()

  }, []);
    if(loading){
        return (
            <>
            <div>
                <Spin className="" tip="loading"></Spin>
            </div>
            </>
        )
    }
  return (
    <>
      {hasToken ? (
    
        <PrivateRoute>
             <MainLayoutPage>
              {children}
             </MainLayoutPage>
        </PrivateRoute>
      ) : (
        <UserRegistration>
          {children}
          </UserRegistration>
      )}
    </>
  );
};

export default HomePage;
