import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { AccessTime } from '@mui/icons-material'
import { Search } from '@mui/icons-material'
import { HelpOutline } from '@mui/icons-material'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function Header() {
    const [user] = useAuthState(auth)
  return (
    <HeaderContainer>
        {/* This is red */}
        {/* This is left Header */}
        <HeaderLeft>
            <HeaderAvatar
                src={user?.photoURL}
                alt={user?.displayName}
                onClick={() => auth.signOut()}

            >
                
            </HeaderAvatar>
            <AccessTime />

        </HeaderLeft>
        
        {/* this is middle Header */}
        <HeaderSearch>
            <Search />
            <input placeholder="Search Ravi's FAM"/>
        </HeaderSearch>

        {/* This is right Header */}
        <HeaderRight>
            <HelpOutline />
        </HeaderRight>
        
    </HeaderContainer>
  )
}

export default Header

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end; // use this in place of float right

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
    }

`

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: #421f44;
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: gray;
    border: 1px gray solid;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: white;
    }
`

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;
    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    
    :hover {
        opacity: 0.8;
    }
`