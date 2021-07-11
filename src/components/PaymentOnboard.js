import React, {useState} from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_SECRET_KEY}`)



export const PaymentOnboard = ({formData, setForm, navigation}) => {

    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
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
                        <Elements stripe = { stripePromise }>
                            <CardElement />
                            <Button 
                            className = "w-100 mt-5"
                            variant="secondary" 
                            type="submit">
                            Setup Account
                         </Button>
                        </Elements>

                    </Form>
                </Card.Body>
         </Card>
         </Col>
         </Row>
    </Container>

    )
}
