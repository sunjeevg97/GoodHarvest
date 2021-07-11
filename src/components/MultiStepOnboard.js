import React from 'react'
import { useForm, useStep } from 'react-hooks-helper'
import {StoreOnboard} from './StoreOnboard'
import {PaymentOnboard} from './PaymentOnboard'
import Navigation from './Navigation'
import styled from 'styled-components'

const Background = styled.div`
    height: 100vh;
    width: 100%;
    background: hsla(346, 84%, 61%, 1);
    background: linear-gradient(135deg, hsla(346, 84%, 61%, 1) 0%, hsla(21, 91%, 73%, 1) 100%);
    background: -moz-linear-gradient(135deg, hsla(346, 84%, 61%, 1) 0%, hsla(21, 91%, 73%, 1) 100%);
    background: -webkit-linear-gradient(135deg, hsla(346, 84%, 61%, 1) 0%, hsla(21, 91%, 73%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#EF476F", endColorstr="#F9A87B", GradientType=1 );
`;

const steps = [
    {id: 'storeInfo'},
]

const storeData = {
    storeName: "",
    storeEmail: "",
    storeAddress: "",
    storeCity: "",
    storeState: "",
    storeZip: "",
    firstName: "",
    lastName: "",
    phoneNum: "",
    businessType: "",
    createdAt: "",
}
export const MultiStepOnboard = () => {
   
    const [formData, setForm] = useForm(storeData)
    const { step, navigation } = useStep({
        steps,
        initialStep:0
    })

    const props = {formData, setForm, navigation}

    function renderComp(step){
        switch(step.id){
            case 'storeInfo':
                return <StoreOnboard {...props}/>
        }
    }

    return (
        <Background>
        <Navigation/>
            {renderComp(step)}
        </Background>
    )
}
