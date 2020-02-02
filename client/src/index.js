import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import UserContextProvider from './context/UserContext';

ReactDOM.render( <BrowserRouter><UserContextProvider> <App /> </UserContextProvider></BrowserRouter> , document.getElementById('root'));


