import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../contexts/users/UserContext';

import { Row, Col, Form, Button } from 'react-bootstrap'

function Register() {

  const context = useContext(UserContext);
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const updateFormField = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>Register</div>
  )
}

export default Register