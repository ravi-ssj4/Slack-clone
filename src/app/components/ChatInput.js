import { Button } from '@mui/material'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function ChatInput({ channelName, channelId, chatRef }) {

    const [user] = useAuthState(auth)
    // const inputRef = useRef(null)
    const [input, setInput] = useState('')

    const sendMessage = async e => {
        e.preventDefault() // prevents refresh(default action when we submit a form: refresh the page -> we want to avoid this)

        // check if channelId is none
        if (!channelId){
            return false
        }
        // take the user inputted value from the input field and save it to the database
        try {
            await addDoc(collection(db, "rooms", channelId, "messages"), {
                // message: inputRef.current.value,
                message: input,
                timestamp: serverTimestamp(),
                user: user.displayName,
                // userImage: "https://upload.wikimedia.org/wikipedia/en/4/45/Jensen_Ackles_as_Dean_Winchester.png"
                userImage: user.photoURL
            })
            console.log("Message added to the channel")
        } catch (e) {
            console.error("Error while adding message to the channel: ", e)
        }    

        chatRef?.current?.scrollIntoView({
            behaviour: "smooth"
        })

        // inputRef.current.value = ""
        setInput("")
    }

    return (
        <ChatInputContainer>
            <form>
                {/* <input ref={inputRef} placeholder={`Message #Room`} /> */}
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName}`} />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`