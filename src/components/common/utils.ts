import { jwtDecode } from "jwt-decode"; 
export const isTokenExpired = (token:any):boolean => {
  try {
    const decoded:any = jwtDecode(token);
    console.log("decoded token,,,,,,,",decoded)
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp < currentTime : true;

  } catch (error) {
    console.error('Failed to decode token:', error);
    return true;
  }
};
//export default isTokenExpired