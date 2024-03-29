import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import { useSelector } from 'react-redux'
import { selectRoomId } from '../../features/appSlice'
import { collection, doc, query, orderBy } from 'firebase/firestore'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import Message from './Message'

function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId) // selects (pulls back) the roomId stored in the redux store!
    // get the room details first(ie. channel details)
    const [roomDetails] = useDocument(roomId ? doc(db, "rooms", roomId) : null)
    // get all the messages from that channel
    const [roomMessages, loading] = useCollection(
        roomId ?
            query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp", "asc")) : null)

    console.log(roomDetails?.data())
    console.log(roomMessages)

    // called whenever the component mounts
    // as well as whenever the roomId changes
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behaviour: "smooth"
        })
    }, [roomId, loading])

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4>
                                <strong>#{roomDetails?.data().name}</strong>
                            </h4>
                            <StarBorderOutlined />
                        </HeaderLeft>
                        <HeaderRight>
                            <p>
                                <InfoOutlined /> Details
                            </p>
                        </HeaderRight>
                    </Header>

                    <ChatMessages>
                        {roomMessages?.docs.map((doc) => {
                            const { message, timestamp, user, userImage } = doc.data()
                            return (
                                <Message
                                    key={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                />
                            )
                        }
                        )}
                        <ChatBottom ref={chatRef} />
                    </ChatMessages>

                    <ChatInput
                        channelName={roomDetails?.data().name}
                        channelId={roomId}
                        chatRef={chatRef}
                    />
                </>
            )}

        </ChatContainer>
    )
}

export default Chat

const ChatBottom = styled.div`
    padding-bottom: 150px;
`

const ChatMessages = styled.div`

`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`

const ChatContainer = styled.div`
    margin-top: 60px;
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
`