import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Header from './app/components/Header';

function App() {
  return (
    <div className="app">
      <Router>
        <>
          <Header />
          <Routes>
            <AppBody>

              <Route path="/" element={
              } exact />

          </Routes>
        </AppBody>
      </>
    </Router>
    </div >
  );
}

export default App;
