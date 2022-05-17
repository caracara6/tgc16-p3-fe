import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../contexts/users/UserContext';

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import styled from 'styled-components'

function Register() {

	const context = useContext(UserContext);
	const navigate = useNavigate()

	const [formState, setFormState] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	})

	const [registerError, setRegisterError] = useState("")	

	const updateFormField = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
	}

	const handleRegister = async() => {
		let registerError = await context.userRegister(formState.first_name, formState.last_name, formState.email, formState.password)

		if (registerError) {
			setRegisterError(registerError)
		} else {
			setRegisterError("")
			navigate('/')
		}
	}

	return (
		<StyledRegisterPage>
			<Container>
				<h1 className='my-5 text-center'>Create Account</h1>

				<Row>
					<Col xs={12} md={6}>
						<Form.Group className="mb-3" >
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text"
								name="first_name"
								value={formState.first_name}
								onChange={updateFormField}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6}>
						<Form.Group className="mb-3" >
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text"
								name="last_name"
								value={formState.last_name}
								onChange={updateFormField}
							/>
						</Form.Group>
					</Col>
				</Row>





				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email"
						name="email"
						value={formState.email}
						onChange={updateFormField}
					/>

				</Form.Group>

				<Form.Group className="mb-5" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password"
						name="password"
						value={formState.password}
						onChange={updateFormField}
					/>
				</Form.Group>
				<p>{registerError}</p>

				<Row>

					<Col xs={12} md={3} >
						<Button onClick={() => { handleRegister() }}>
							Create
						</Button>
					</Col>

					<Col xs={12} md={4}>
						<Button onClick={() => { navigate('/')}}>
							Return to Store
						</Button>
					</Col>


				</Row>




			</Container>
		</StyledRegisterPage>
	)
}

const StyledRegisterPage = styled.section`

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: rotateX(-10deg);
	}

	to{
		opacity: 1;
		transform: rotateX(0);
	}
}

@keyframes slideIn {
	from{
		width: 0;
	}

	to{
		width: 40px;
		transition: width 0.5s ease-out;
	}
}

margin-top: 15vh;
padding-bottom: 3rem;

h1{
	position: relative;
}

h1::after{
	content: "";
	width: 40px;
	height: 3px;
	background-color: ${({ theme }) => theme.colours.dark};
	position absolute;
	bottom: -15px;
	left: 50%;
	margin-left: -15px;
	animation: slideIn 1s
}


button{
	border-radius: 0px;
	background-color: white;
	color: black;
	border: 0px;
	padding: 0.5rem 2rem;
	width: 100%;
	animation: fadeIn 1s
}

.col-12:first-of-type button{
	background-color: ${({ theme }) => theme.colours.dark};
	color: white;
	margin-right: 1rem;
}

input {
	border: 1px solid ${({ theme }) => theme.colours.dark};
	border-radius: 0px;
}

@media (min-width: ${({ theme }) => theme.md}) {
	margin-top: 5vh;
}

@media (min-width: ${({ theme }) => theme.lg}) {
	padding-left: 7rem;
	padding-right:7rem;
}

@media (min-width: ${({ theme }) => theme.xl}) {
	padding-left: 15rem;
	padding-right: 15rem;
}

`

export default Register