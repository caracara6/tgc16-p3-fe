import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../contexts/users/UserContext';

import { Form, Button } from 'react-bootstrap'


function Login() {

	const context = useContext(UserContext);
	const navigate = useNavigate()

	const [ formState, setFormState] = useState({
        email: '',
        password: ''
    })

	let [loginError, setLoginError] = useState("")

	const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

	const handleLogin = async () => {
		let loginError = await context.userLogin(formState.email, formState.password)
		console.log('loginError=> ', loginError)

		if(loginError){
			setLoginError(loginError)
		} else {
			setLoginError("")
			navigate('/')
		}
	}




	return (
		<React.Fragment>

			
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" 
									placeholder="Enter email"
									name="email" 
									value={formState.email}
									onChange={ updateFormField }
					 />
					
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" 
									placeholder="Password"
									name="password" 
									value={formState.password}
									onChange={ updateFormField }
									/>
				</Form.Group>
				
				<Button variant="primary" onClick={() => {handleLogin()}}>
					Submit
				</Button>
			





			<div>
			<NavLink to="/account/register">Create Account</NavLink>
			</div>

			<p>{loginError}</p>
			

		</React.Fragment>

	)
}

export default Login