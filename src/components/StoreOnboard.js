import React, {useRef, useState} from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import {useAuth} from '../contexts/AuthContext'
import {useHistory} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {db} from '../firebase'
import Select from 'react-select'

const Background = styled.div`
    height: 100vh;
    width: 100%;
    background: hsla(346, 84%, 61%, 1);
    background: linear-gradient(135deg, hsla(346, 84%, 61%, 1) 0%, hsla(21, 91%, 73%, 1) 100%);
    background: -moz-linear-gradient(135deg, hsla(346, 84%, 61%, 1) 0%, hsla(21, 91%, 73%, 1) 100%);
    background: -webkit-linear-gradient(135deg, hsla(346, 84%, 61%, 1) 0%, hsla(21, 91%, 73%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#EF476F", endColorstr="#F9A87B", GradientType=1 );
`;


const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_SECRET_KEY}`)

export const StoreOnboard = ({formData, setForm, navigation}) => {


    const { storeName, storeAddress, storeCity, storeState, storeZip, firstName, lastName, phoneNum} = formData

    const {currentUser} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const location = useLocation()

    const storeNameRef = useRef()
    const storeAddressRef = useRef()
    const storeCityRef = useRef()
    const storeStateRef = useRef()
    const storeZipRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const phoneNumRef = useRef()

    const [selected, setSelected] = useState()

    const onChange = selectedOptions => setSelected(selectedOptions)

    const storeTypeOptions = [
        {value: "restaurant", label: "Restaurant"},
        {value: "bar", label: "Bar"},
        {value: "liquor store", label: "Liquor Store"},
        {value: "specialty food store", label: "Specialty Food Store"}
    ]


    async function handleSubmit(e){
        e.preventDefault()

         setLoading(true)


        const addNewStore = await db.stores.add({
            storeName: storeNameRef.current.value,
            storeEmail: currentUser.email,
            storeAddress: storeAddressRef.current.value, 
            authID: currentUser.uid,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            businessType: selected.map(i => i.value),
            createdAt: db.getCurrentTimestamp(),
            //bankingInfo
          })
        
    //     console.log(addNewStore.id)

         setLoading(false)
        
         history.push("/feed")
     }

    return (
        
        <Container className = "h-100">
            <Row className="align-items-center h-100">
                <Col sm={12}>
            <Card  className= "mx-auto shadow-lg" style={{ width: '30rem'}}>
                <Card.Title className="align-items-center d-flex justify-content-center mt-5">Onboard Your Store</Card.Title>
                    <Card.Body>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formStoreName">
                    <Col sm={12}>
                
                        <Form.Control 
                        name = "storeName"
                        type="text" 
                        placeholder = "Store Name"
                        value= {storeName}
                        onChange = {setForm}
                        ref={storeNameRef} 
                        required/>

                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="storeAddress" className="mt-1">
                        <Col sm={12}>
                        <Form.Control 
                        type="text" 
                        name="storeAddress"
                        placeholder="Address"
                        value= {storeAddress}
                        onChange = {setForm}
                        ref = {storeAddressRef}
                        />

                        </Col>
            </Form.Group>

            <Form.Row>
            <Form.Group as={Col} controlId="storeCity" className="mt-1">
                        <Form.Control 
                        type="text" 
                        name="storeCity"
                        placeholder="City"
                        value= {storeCity}
                        onChange = {setForm}
                        ref = {storeCityRef}
                        />

            </Form.Group>
            <Form.Group as={Col} controlId="storeState" className="mt-1">
                        <Form.Control 
                        type="text" 
                        name="storeState"
                        placeholder="State"
                        value= {storeState}
                        onChange = {setForm}
                        ref = {storeStateRef}
                        />

                    
            </Form.Group>
            <Form.Group as={Col} controlId="storeZip" className="mt-1">
                        <Form.Control 
                        type="text" 
                        name="storeZip"
                        placeholder="Zip"
                        value= {storeZip}
                        onChange = {setForm}
                        ref = {storeZipRef}
                        />
            </Form.Group>
            </Form.Row>

            <Form.Row>
            
            <Form.Group as={Col} controlId="firstName" className="mt-5">
                    
                    <Form.Control 
                        type="text" 
                        name="firstName"
                        placeholder="First Name"
                        value= {firstName}
                        onChange = {setForm}
                        ref = {firstNameRef}
                     />

            </Form.Group>

            <Form.Group as={Col} controlId="lastName" className="mt-5">
                    
                    <Form.Control 
                        type="text" 
                        name="lastName"
                        placeholder="Last Name"
                        value= {lastName}
                        onChange = {setForm}
                        ref = {lastNameRef}
                     />

            </Form.Group>
            </Form.Row>

            <Form.Group as={Row} controlId="phoneNum">
                <Col sm={12}>
                    
                    <Form.Control 
                        type="text" 
                        name="phoneNum"
                        placeholder="Mobile Phone Number"
                        value= {phoneNum}
                        onChange = {setForm}
                        ref = {phoneNumRef}
                     />

                </Col>   
            </Form.Group>

            <Form.Group as={Row} controlId="storeType">
                <Col sm={12}>
                <Select
                    isMulti
                    name="storeType"
                    options={storeTypeOptions}
                    onChange={onChange}
                    className="store-multi-select"
                    classNamePrefix="select"
                    placeholder= {'Store Type'}
                />

                </Col>
            </Form.Group>

            <Elements stripe = { stripePromise }>
                <CardElement />
            </Elements>

            <Button 
                className = "w-100 mt-5"
                variant="secondary" 
                type="submit">
                    Setup Account
            </Button>

        

            <div className = "alertbox w-100 mt-3">
            
            </div>
        </Form>
        
            </Card.Body>
             </Card>
             </Col>
             </Row>
        </Container>

        
    )
}
