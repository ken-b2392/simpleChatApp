import React, { useContext, useState, useEffect } from 'react';
import {auth} from '../fbdb';

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [awaiAccount, setAwaitAccount] = useState(true);
    const [currentUser, setCurrentUser] = useState();

        function signUp(email, password){
            return auth.createUserWithEmailAndPassword(email, password)
        }

        function logIn(email, password){
            return auth.signInWithEmailAndPassword(email, password)
        }

        function logOut(){
            return auth.signOut()
        }

        function changePassword(password){
            return currentUser.updatePassword(password)
        }

        function resetPassword(email){
            return auth.sendPasswordResetEmail(email)
        }

    useEffect(() => {
         const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setAwaitAccount(false)
        })

        return unsubscribe
        
    }, [])

    const value= {
        currentUser,
        signUp,
        logIn,
        logOut,
        changePassword,
        resetPassword
    }

    return (
        <div>
            <AuthContext.Provider value={value}>
                {!awaiAccount && children}
            </AuthContext.Provider>
        </div>
    )
}
