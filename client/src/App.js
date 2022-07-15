import io from 'socket.io-client';
import React, { useState } from 'react';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
        socket.emit("join_room", room);
        setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ?
        <div className='input-area'>
        <h3>Join A Chat</h3>
          <div className='inputs'>
            <input type="text" placeholder="Jonh..." onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" placeholder="Room id" onChange={(e) => setRoom(e.target.value)}/>
          </div>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
        : (<Chat socket={socket} username={username} room={room}/>)
      }
    </div>
  );
}

export default App;
