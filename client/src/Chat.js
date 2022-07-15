import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);
            setMessageList((listBefore) => [...listBefore, messageData]);
        };
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((listBefore) => [...listBefore, data]);
        })
    }, [socket])

  return (
    <div className='chat'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
        <div className='chat-window'>
            <div className='chat-body'>
                {
                    messageList.map((messageContent) => {
                        return <div className='message' id={username === messageContent.author ? 'you' : 'other'}>
                            <div className='message-data'>
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p>{messageContent.author}</p>
                                    <p>{messageContent.time}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <div className='chat-footer'>
                <input onKeyPress={(e) => {e.key === 'Enter' && sendMessage()}} type="text" placeholder='Hey...' onChange={(e) => setCurrentMessage(e.target.value)}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
    </div>
  )
}

export default Chat