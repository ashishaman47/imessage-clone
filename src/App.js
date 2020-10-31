import React, { useEffect } from 'react';
import './App.css';
import { login, logout, selectUser } from './features/userSlice';
import Imessage from './Imessage';
import {useDispatch, useSelector} from 'react-redux';
import Login from './Login';
import {auth} from './firebase'

function App() {
  // pulling the user
  const user = useSelector(selectUser);

  // A Gun --> go ahead and fire changes / action into the reducer
  const dispatch = useDispatch();

  useEffect(()=> {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        //user is logged in
        dispatch(
          login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        })
        );
      } else {
        //user is logged out
        dispatch(logout())
      }
    })
  },[])

  return (
    <div className="app">
      {user? (
        <Imessage />
      ): (
        <Login />
      )}
      
    </div>
  );
}

export default App;
