import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useAuth} from '../contexts/AuthContext';
import {useHistory} from 'react-router-dom';
import {db} from '../firebase';
import InputGroup from 'react-bootstrap/InputGroup';
import {IoIosAlert} from 'react-icons/io';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function SignUp(){
    
    const storeEmailRef = useRef();
    const storePasswordRef = useRef(); 
    const docID = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { currentUser } = useAuth();
    
    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('')
            setLoading(true)
            await signup(storeEmailRef.current.value, storePasswordRef.current.value)
            setLoading(false)
            
            history.push("/onboard")
        }catch{
            setLoading(false)
            setError("Signup failed") 
        }
    }
    

    return (
        <Form onSubmit={handleSubmit}>
            
            <Form.Group as={Row} controlId="formEmail" className="mt-5">
                <Col sm={12}>
                
                <InputGroup>

                   <Form.Control 
                        type="email" 
                        name="storeEmail"
                        placeholder="Email address"
                    ref={storeEmailRef} required/>

                        {/*<Form.Text className="text-muted">
                            This email should be the point of contact for your store.
    </Form.Text>*/}
                    <OverlayTrigger placement="right-end"  overlay={<Tooltip id="button-tooltip-2">This email should be the point of contact for your store</Tooltip>}>

                    {({ref, ...triggerHandler}) => 
                     <InputGroup.Append>
                     <InputGroup.Text 
                        ref = {ref}
                        {...triggerHandler} >
                        <IoIosAlert></IoIosAlert>
                        </InputGroup.Text>
                     </InputGroup.Append>
                    }
                    </OverlayTrigger>
                   
                </InputGroup>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formPassword">
            <Col sm={12}>

                    
                    <Form.Control 
                        type="password" 
                        name="storePassword"
                        placeholder="Password"
                    ref={storePasswordRef} required/>

            </Col> 

            </Form.Group>
            <Button 
                className = "w-100 mt-5"
                disabled={loading}
                variant="primary" 
                type="submit">

                Log In
            </Button>

            <div className = "alertbox w-100 mt-5">
            {error && <Alert variant="danger"> {error}</Alert>}
            </div>
        </Form>
        
    );
};
