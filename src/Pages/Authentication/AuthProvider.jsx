import { createContext, useEffect, useState } from "react";
import app from "./firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export let auth = getAuth(app);
export let AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    let [loading, setLoading] = useState(true);
    let [user, setUser] = useState(null);

    let createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    let signUp = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    let updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    let logout = (auth) => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        let unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser);
            setLoading(false);
        })

        return () => unSubscribe();
    }, [])

    let authInfo = {
        createAccount,
        signUp,
        updateUserProfile,
        logout,
        user,
        loading,
        setLoading
    };

    return (
          <AuthContext.Provider value={authInfo} >
              {children}
          </AuthContext.Provider>
      )

};

export default AuthProvider;