import React, {  useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

import { GoogleAuthProvider } from "firebase/auth";
import { auth } from '../Firebase/firebase.init';


const AuthProvider = ({children}) => {
  const provider = new GoogleAuthProvider();
    const [user,setUser]=useState();
    const [loading,setLoading]=useState(true);

    const createUser=(email,password)=>
    {
      setLoading(true)
      return createUserWithEmailAndPassword(auth,email,password)

    }

    const loginUser =(email,password)=>
    {
      setLoading(true)
      return signInWithEmailAndPassword(auth,email,password)
    }


    const googleSignIn =()=>
    {
      setLoading(true)
      return signInWithPopup(auth , provider)
    }
    const logoutUser=()=>
    {
      setLoading(true)
      return signOut(auth)
    }
    const updateUser=(profile)=>
    {
        return updateProfile(auth.currentUser,profile)
    }

    useEffect(()=>
    {
      const unsubscribe=onAuthStateChanged(auth,currentUser=>
      {
        setUser(currentUser);
        setLoading(false)
      }
      )
      return ()=>
        {
            unsubscribe();
        }

    },[])

    const authInfo={user,setUser,createUser,loginUser,logoutUser,googleSignIn,loading,setLoading,updateUser}
  return (
   <AuthContext value={authInfo}>
    {children}
   </AuthContext>
  );
};

export default AuthProvider;