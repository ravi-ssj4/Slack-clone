import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

function Login() {
    // using async and await
    // const signIn = async (e) => {
    //     e.preventDefault(); // Prevent the default form submit behavior
    
    //     try {
    //         // Attempt to sign in with a popup, using Google as the provider
    //         const result = await signInWithPopup(auth, provider);
    //         // Optional: Extract the access token if needed
    //         // const token = (result.credential).accessToken;
    //         // The signed-in user's information
    //         const user = result.user;
    //         console.log(user); // For demonstration purposes, consider handling the user info appropriately
    //     } catch (error) {
    //         // Handle any errors that occur during the sign-in process
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // Optional: Extract additional details about the error
    //         // const email = error.customData.email;
    //         // const credential = GoogleAuthProvider.credentialFromError(error);
    //         alert(`Failed to sign in: ${errorMessage}`);
    //     }
    // };

    const signIn = (e) => {
        e.preventDefault()

        signInWithPopup(auth, provider) // an asynchronous call
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user, token)
        })
        .catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.email;
            alert(errorMessage);
        });
    }

  return (
    <LoginContainer>
        <LoginInnerContainer>
            <img src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg' alt='' />
            <h1>Sign into Ravi's FAM</h1>
            <p>ravifam.slack.com</p>

            <Button onClick={signIn}>
                Sign in with Google
            </Button>
        </LoginInnerContainer>
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) ;

    >img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }

    > button {
        margin-top: 50px;
        background-color: green !important; 
        color: white;
        text-transform: inherit !important;
    }
`