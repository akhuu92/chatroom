import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

const ENDPOINT = 'localhost:5000';
let socket = io(ENDPOINT);

const App = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', message => {
            //receive from server 
            //console.log(`msg from client ${msg}`);
            setMessages(messages => [...messages, message]);
        });    
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            setMessage('');
            socket.emit('sendMessage', message)
        }
    }

    console.log(message, messages);
    
    return (
        <>
            <div>
                <form>
                    <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} />
                    <input type="submit" value="Send" onClick={sendMessage} />
                </form>
            </div>
            <div>
                {messages.map(message => (
                   <p>{JSON.stringify(message)}</p>
                ))}
            </div>
        </>
    )
}

export default App;