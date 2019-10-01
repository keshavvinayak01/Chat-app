import React, { Component } from 'react'

class InitializeChatComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username : ''
        }
    }

    usernameChangeHandler = (event) => {
        this.setState({
            username : event.target.value
        });
    }
    
    render() {
        return (
            <div className="login">
                <form onSubmit={(e) => this.props.handleLogin(e, this.state.username)} className="form">
                    <input 
                    type="text"
                    onChange={this.usernameChangeHandler}
                    value={this.state.username}
                    placeholder="Username"
                    required />
                    
                    <button className="submit" type="submit">
                        Let's Chat!
                    </button>
                </form>
            </div>
        );
    }
}

export default InitializeChatComponent;