import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../contexts/users/UserContext';

import { Form, Button } from 'react-bootstrap'


function Login() {

	let context = useContext(UserContext);

	const [ formState, setFormState] = useState({
        email: '',
        password: ''
    })

	const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

	const handleLogin = () => {
		context.userLogin(formState.email, formState.password)
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
			

		</React.Fragment>

	)
}

export default Login