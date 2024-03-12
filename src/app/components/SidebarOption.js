import React from 'react'
import styled from 'styled-components'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { enterRoom } from '../../features/appSlice'


// destructuring the props object into Icon and title
// basically tear apart the object and pull out the 
// individual entities in the args section of the function itself
function SidebarOption({ Icon, title, addChannelOption, id}) {

    const dispatch = useDispatch() // like a gun to shoot actions into the redux store
    
    const addChannel = async () => {
        const channelName = prompt("Please enter the channel name: ")
        if (channelName) {
            try {
                await addDoc(collection(db, "rooms"), {
                    name: channelName
                })
                console.log("Channel added with name: ", channelName)
            } catch (e) {
                console.error("Error adding channel: ", e)
            }
        }
    }

    const selectChannel = () => {
        if (id) {
            // we dispatch(shoot) the payload mentioned here into the redux store through the enterRoom function(defined in appSlice.js)
            dispatch(enterRoom({
                roomId: id
            }))

        }
    }


  return (
    <SidebarOptionContainer
        onClick={addChannelOption? addChannel : selectChannel}
    >
        {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
        {Icon ? (
            <h3>{title}</h3>
        ) : (
            <SidebarOptionChannel>
                <span>#</span> {title}
            </SidebarOptionChannel>
        )}
    </SidebarOptionContainer>
  )
}

export default SidebarOption

const SidebarOptionContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;

    }

    > h3 > span {
        padding: 15px;
    }
`

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`