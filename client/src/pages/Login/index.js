import { Modal, notification, Input } from "antd"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./style.scss"
import { checkValidate } from "../../validate/UserValidate"
import { login } from "../../services/UserService"
import { setCookie } from "../../helpers/cookie"
import TypeEmail from "../../components/ForgotPassword/Email"


function Login() {
  const navigate = useNavigate()
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  })
  const [errForm, setErrForm] = useState({
    email: "",
    password: "",
  })

  function handleChangeInput(e) {
    const { name, value } = e.target
    setDataLogin({ ...dataLogin, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = checkValidate(dataLogin)
    if (err.email || err.password) {
      setErrForm({
        email: err.email,
        password: err.password,
      })
    } else {
      const result = await login(dataLogin)
      if (result.code === 200) {
        setCookie("tokenUser", result.token)
        setCookie("id", result.id)
        navigate("/")
        notification.success({
          message: "Welcome!",
          placement: "top",
          duration: 3,
        })
      }else {
        notification.error({
          message: "Wrong email or password!",
          placement: "top",
          duration: 3,
        })
      }
    }
  }
  //forgot password
  

  return (
    <div className="login">
      <div className="login__form">
        <h3 className="login__form-title">Log in</h3>
        <form onSubmit={handleSubmit}>
          <div className="login__input-group">
            <div className="form-floating">
              <input
                name="email"
                type="email"
                className={`login__form-group-input form-control ${
                  errForm.email ? "border-danger" : ""
                }`}
                id="floatingEmail"
                placeholder="name@example.com"
                onChange={handleChangeInput}
              />
              <label htmlFor="floatingEmail">Email address</label>
              {errForm.email && (
                <small className="text-danger">{errForm.email}</small>
              )}
            </div>
          </div>
          <div className="login__input-group">
            <div className="form-floating">
              <input
                name="password"
                type="password"
                className={`login__form-group-input form-control ${errForm.password ? "border-danger" : ""}`}
                id="floatingPassword"
                placeholder="Password"
                onChange={handleChangeInput}
              />
              <label id="labelPassword" htmlFor="floatingPassword">
                <p>Password</p>
              </label>
              {errForm.password && (
                <small className="text-danger">{errForm.password}</small>
              )}
            </div>
            <TypeEmail/>
          </div>
          <button
            type="submit"
            className="btn btn-primary login__submit-button"
          >
            Log In
          </button>
          <p className="login__signup">
            Don't have an account?{" "}
            <Link to="/user/register" className="login__signup-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>

    </div>
  )
}

export default Login
