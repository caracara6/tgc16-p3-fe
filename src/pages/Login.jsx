import React from 'react'
import { NavLink } from 'react-router-dom'

function Login() {
  return (
    <React.Fragment>
      <div>Login</div>
    <NavLink to="/account/register">Create Account</NavLink>

    </React.Fragment>
    
  )
}

export default Login