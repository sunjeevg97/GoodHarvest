import {useReducer, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

export default function useStore(storeID = null) {
    
    const [state, dispatch] = useReducer()

    useEffect(() => {
        db.stores
        .doc(storeID)
        .get()
        .then(doc => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    })

    return state
}
