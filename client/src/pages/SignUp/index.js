import { notification } from "antd"
import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./style.scss"
import { register } from "../../services/UserService"
import { checkValidate } from "../../validate/UserValidate"
import { setCookie } from "../../helpers/cookie"
import { Link, useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPw: "",
  })

  const [errForm, setErrForm] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPw: "",
  })

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = checkValidate(data)

    if (err.email || err.fullname || err.password || err.confirmPw) {
      setErrForm({
        email: err.email,
        fullname: err.fullname,
        password: err.password,
        confirmPw: err.confirmPw,
      })
    } else {
      const result = await register(data)
      if (result.code === 200) {
        setCookie("tokenUser", result.token)
        setCookie("id", result.id)
        navigate("/")
        notification.success({
          message: "SignUp Success!",
          placement: "top",
          duration: 2,
        })
      }
    }
  }

  return (
    <div className="register">
      <div className="register__form">
        <h3 className="register__form-title">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="register__input-group">
            <div className="form-floating">
              <input
                name="fullname"
                type="text"
                className={`register__form-group-input form-control ${
                  errForm.fullname ? "border-danger" : ""
                }`}
                id="floatingfullname"
                placeholder="Enter your full name"
                onChange={handleChangeInput}
              />
              <label htmlFor="floatingfullname">Full Name</label>
              {errForm.fullname && (
                <small className="text-danger">
                  {errForm.fullname}
                </small>
              )}
            </div>
          </div>
          <div className="register__input-group">
            <div className="form-floating">
              <input
                name="email"
                type="text"
                className={`register__form-group-input form-control ${
                  errForm.email ? "border-danger" : ""
                }`}
                id="floatingEmail"
                placeholder="name@example.com"
                onChange={handleChangeInput}
              />
              <label htmlFor="floatingEmail">Email address</label>
              {errForm.email && (
                <small className="text-danger">
                  {errForm.email}
                </small>
              )}
            </div>
          </div>
          <div className="register__input-group">
            <div className="form-floating">
              <input
                type="password"
                name="password"
                className="register__form-group-input form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={handleChangeInput}
              />
              <label htmlFor="floatingPassword">Password</label>
              { errForm.password && (
                <small className="text-danger">{errForm.password}</small>
              )}
            </div>
          </div>
          <div className="register__input-group">
            <div className="form-floating">
              <input
                type="password"
                name="confirmPw"
                className={`register__form-group-input form-control
                  ${errForm.confirmPw && "border-danger"}
                `}
                id="floatingConfirmPassword"
                placeholder="Confirm Password"
                onChange={handleChangeInput}
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              {errForm.confirmPw && (
                <small className="text-danger">{errForm.confirmPw}</small>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary register__submit-button"
          >
            Sign Up
          </button>
          <p className="register__login">
            Already have an account?{" "}
            <Link to="/user/login" className="register__login-link">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
