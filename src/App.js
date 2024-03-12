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

function App() {
  return (
    <div className="app">
      <Router>
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} exact />

            </Routes>
          </AppBody>
        </>
      </Router>
    </div >
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`