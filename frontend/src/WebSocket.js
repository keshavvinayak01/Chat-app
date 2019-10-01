import config from './config';

class WebSocketService{
    static instance = null; 
    callbacks = {};
    
    static getInstance(){
        if (!WebSocketService.instance){
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor(){
        this.socketRef = null;
    }

    connect(){
        const path = config.API_PATH;
        this.socketRef = new WebSocket(path);
        
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data);
          };

        this.socketRef.onopen = () => {
            console.log("WebSocket open");
        };
        
        this.socketRef.onerror = e => {
            console.log(e.message);
        };

        this.socketRef.onclose = () => {
            console.log("WebSocket closed, restarting..");
            this.connect();
        };   
    }

    socketNewMessage(data){
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if(Object.keys(this.callbacks).length === 0){
            return;
        }
        if(command === 'messages'){
            this.callbacks[command](parsedData.messages);
        }
        if(command === 'new_message'){
            console.log("okay so this was called")
            this.callbacks[command](parsedData.message);
        }
    }

    initChatUser(username){
        this.sendMessage({command : 'init_chat', username : username});
    }

    fetchMessages(username){
        this.sendMessage({command : 'fetch_messages', username : username});
    }

    newChatMessage(message){
        this.sendMessage({command : 'new_message', from : message.from, text : message.text});
    }

    addCallbacks(messagesCallback, newMessageCallback){
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage(data){
        try{
            console.log({...data})
            this.socketRef.send(JSON.stringify({...data}))
        }
        catch(err){
            console.log(err.message);
        }
    }
    state(){
        return this.socketRef.readyState;
    }
    waitForSocketConnection(callback){
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
            function(){
                if(socket.readyState === 1){
                    console.log("Connection is made");
                    if(callback != null){
                        callback();
                    }
                    return;
                }
                else{
                    console.log("Wait for connection..");
                    recursion(callback);
                }
            }, 1);
    }
}

let WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;