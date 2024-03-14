import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Header from './app/components/Header';
import Sidebar from './app/components/Sidebar';
import styled from 'styled-components';
import Chat from './app/components/Chat';
import { auth } from './app/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './app/components/Login';
import Spinner from 'react-spinkit';

function App() {

  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg' alt='' />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn='none' />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Chat />} exact />

              </Routes>
            </AppBody>
          </>
        )}

      </Router>
    </div >
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`