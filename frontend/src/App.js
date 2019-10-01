import React, { Component } from 'react';
import './static/css/App.css';
import InitializeChatComponent from './Components/InitializeChatComponent';
import ChatComponent from './Components/ChatComponent';
import WebSocketInstance from './WebSocket';

class App extends Component{
	constructor(props) {
		super(props)
		
		this.state = {
			username : '',
			loggedIn : false
		};
	}
	
	handleLogin = (e, username) => {
		e.preventDefault();
		this.setState({loggedIn : true, username : username});
		WebSocketInstance.connect();
		console.log(this.state);
	}

	render(){
		const { username,loggedIn } = this.state;
		return (
			<div className="App">
				{
					loggedIn ?
					<ChatComponent currentUser={username}
					/>
					:
					<InitializeChatComponent 
					handleLogin = {this.handleLogin}
					/>
				}
			</div>
		);
	}
	
}

export default App;