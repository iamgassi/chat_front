import './App.css';
import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';  
import Chat from './components/Chat';
import StartChat from './components/StartChat';
function App() {
  return (
    <>

  <Routes>
    <Route exact path="/" element={ <Login/>}></Route>
    {/* <Route exact path="/login" element={ <Login/>}> </Route> */}
    <Route exact path="/register" element={ <Register/>}> </Route>
    <Route exact path="/Chat" element={ <Chat/>}> </Route>
    <Route exact path="/StartChat" element={ <StartChat/>}> </Route>

  </Routes>
  
    </>
  );
}

export default App;
