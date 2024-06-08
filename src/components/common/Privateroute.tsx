import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { isTokenExpired } from "@/src/components/common/utils";
import { SP } from "next/dist/shared/lib/utils";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  //const router=useRouter()
  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    const refreshToken = localStorage.getItem("refreshtoken");
    const accessTokencheck=isTokenExpired(accessToken)
    const refrestokencheck=isTokenExpired(refreshToken)
    if (!accessTokencheck || !refrestokencheck) {
      setIsAuthenticated(true);
      setLoading(false);
    } 
     else {
      setIsAuthenticated(false);
      setLoading(false);
      //router.push("/login"); // Redirect to login page
    }
  }, []);

  if (loading) {
    return (
        <>
        <div>
            <Spin size="large" tip="loading"/>
        </div>
        </>
    )
  }

  return <>{isAuthenticated ? children : null} </>;
};

export default PrivateRoute;
