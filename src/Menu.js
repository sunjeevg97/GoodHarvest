import React, {useState} from 'react';
import Component from 'react';
import { db } from './firebase';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
const Wrapper = styled.section `
    height:100vh;
    width:100%;

`;
export class Menu extends React.Component{
    constructor(props){
        super(props);

    
       this.state = {
           farm: [],
           isLoading: true
        }
    }

  async componentDidMount(){
    let venueId = this.props.location.state.venue_id;

    let producersRef = await db.collection('venues').doc(venueId).collection("Producers").get();
    
    let farmArr = [];
    for(const producer of producersRef.docs){
        let isAttending = producer.get('isAttending');
    
        if(isAttending == true){
            let fname = producer.get("name");
            
            let farmRef = await db.collection('venues').doc(venueId).collection("Producers").doc(producer.id).collection("Inventory").get();
            let itemsArr = []
    
            for(const i of farmRef.docs){
                let iName = i.id;
                let itemWeight = i.get('unit');
                let itemPrice = i.get('price');
    
                let itemObj = {
                    name : iName,
                    weight: itemWeight,
                    price: itemPrice
                }
    
                itemsArr.push(itemObj);
    
    
            }
    
            let farmObj = {
                name: fname,
                inventory: itemsArr
            }
            farmArr.push(farmObj);
           
    
        }
    
    }
    
    this.setState({farm: farmArr});
    
    console.log(this.state.farm);
       
        
  }


    render(){
        
        console.log(this.state.farm);
            return (
              <div>
            <Form>
               {
                   this.state.farm.map((item)=>
                    <div>
                        <h1 class="display-4">{item.name}</h1>
                        <ul>
                            {item.inventory.map((sub) =>
                                    <div key={`default-checkbox`} className="mb-3">
                                    <Form.Check 
                                      type={`checkbox`}
                                      id={sub.name}
                                      label={sub.name}
                                    />
                                    </div>
                            )}
                        </ul>
                   </div>
                   )
                }
                </Form>
              </div>
            )

    }
}