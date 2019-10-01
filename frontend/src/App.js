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
	
	handleLogin = (username) => {
		this.setState({loggedIn : true, username : username});
		WebSocketInstance.connect();
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
					onSubmit = {this.handleLogin}
					usernameChangeHandler={this.usernameChangeHandler}
					/>
				}
			</div>
		);
	}
	
}

export default App;