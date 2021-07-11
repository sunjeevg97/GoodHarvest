import React, {useRef, useState} from 'react';
import { Link , useHistory} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {useAuth} from '../contexts/AuthContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap-floating-label';

const SignIn = () => {
    const storeEmailRef = useRef();
    const storePasswordRef = useRef(); 
    const { signin } = useAuth()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('')
            setLoading(true)
            await signin(storeEmailRef.current.value, storePasswordRef.current.value)
            history.push("/feed")
        }catch{
            setError("Failed to sign in")
        }

        setLoading(false)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formEmail" className="mt-5 mb-3">
                <Col sm={12}>
                    
                   <Form.Control 
                        type="email" 
                        name="storeEmail"
                        placeholder="Email address"
                    ref={storeEmailRef}/>

                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPassword">
                <Col sm={12}>
                    
                    <Form.Control 
                        type="password" 
                        name="storePassword"
                        placeholder="Password"
                    ref={storePasswordRef} />

                </Col>   
            </Form.Group>

            <Button 
                className = "w-100 mt-5"
                disabled={loading}
                variant="primary" 
                type="submit">

                Log In
            </Button>

            <div className = "alertbox w-100 mt-3">
            {error && <Alert variant="danger"> {error}</Alert>}
            </div>
        </Form>
    );
}
export default SignIn;