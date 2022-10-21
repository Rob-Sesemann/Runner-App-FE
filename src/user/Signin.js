import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function Signin(props) {

    //Handle Change Function
    const [newUser, setNewUser] = useState ({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }
//I am going to receive the props of registerHandler - I will write props in Signup above so that I can receive that.
    const loginHandler = () => {
        props.login(newUser)
    }

  return (
    <div>
        <h1>Signin</h1>

        <Container>
            <Form.Group>
                <Form.Label> Email Address </Form.Label>
                <Form.Control name="emailAddress" onChange={changeHandler} />
            </Form.Group>

            <Form.Group>
                <Form.Label> password </Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler} />
            </Form.Group>

            <Button variant="primary" onClick={loginHandler}>
                Login
            </Button>
        </Container>
    </div>
  )
}