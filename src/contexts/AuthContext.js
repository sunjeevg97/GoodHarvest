import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase"
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    //signup with firebase
    function signup (email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    
    //login with firebase
    function signin (email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut();
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
                if(user){
                    setCurrentUser(user)
                }else{
                    setCurrentUser("")
                    
                }
                setLoading(false)
            
        })

        return unsubscribe;
    }, [])
    
    const value = {
        currentUser,
        signin,
        signup,
        logout
    }
    
    return(
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}