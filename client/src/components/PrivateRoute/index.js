import { Navigate, Outlet } from "react-router-dom"
import { getCookie } from "../../helpers/cookie"

function PrivateRoute() {
  const isLogin = getCookie("tokenUser")
  return (
    <>  
      {isLogin.length > 0 ? (<Outlet/>) : (<Navigate to="/user/login"/>)}
    </>
  )
}

export default PrivateRoute