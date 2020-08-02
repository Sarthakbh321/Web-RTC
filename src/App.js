import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Join from './pages/Join';
import Chat from './pages/Chat';

function App() {
	return (
		<Router>
			<Route exact path="/" component={Join} />
			<Route exact path="/chat" component={Chat} />
		</Router>
	);
}

export default App;
