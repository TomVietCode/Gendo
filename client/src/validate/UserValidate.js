export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword
}

export const checkValidate = (form) => {
  const err = { email: "", fullname: "", password: "", confirmPw: "" }
  if (form.email.length === 0) {
    err.email = "Email cannot be empty"
  } else if (!validateEmail(form.email)) {
    err.email = "Email is not in a valid format"
  }

  if(form.fullname?.length){
    err.fullname = "Your name cannot be empty"
  }
  
  if (form.password.length === 0) {
    err.password = "Password cannot be empty"
  } else if (form.password.length < 6) {
    err.password = "Password cannot be shorter than 6 characters"
  } else if (form.password !== form.confirmPw) {
    err.confirmPw = "Confirm password does not match"
  }

  return err
}
