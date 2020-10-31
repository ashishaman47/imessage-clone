import { IconButton } from '@material-ui/core';
import { MicNone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './Chat.css'
import { selectChatId, selectChatName } from './features/chatSlice';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { selectUser } from './features/userSlice';


function Chat() {

    const [input, setInput] = useState('');
    // pulling chat name, chat id
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    // pulling user
    const user = useSelector(selectUser);

    useEffect(()=> {
        if(chatId) {
            db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })))
            ));
        }
    },[chatId])

    // state to keep track of messages
    const [messages, setMessages] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault();

        // Firebase db storing messages in particular chat room
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
        });

        setInput('');
    }

    return (
        <div className='chat'>
            {/* chat header */}
            <div className="chat__header">
                <h4>To: <span className='chat__name'>{chatName}</span></h4>
                <strong>Details</strong>
            </div>
            {/* chat messages */}
            <div className="chat__messages">
                <FlipMove>
                {messages.map(({id, data}) => (
                    <Message key={id} contents={data} />
                ))}
                </FlipMove>
                
            </div>

            {/* chat input */}
            <div className="chat__input">
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder='iMessage' type="text"/>
                    <button onClick={sendMessage}>Send Message</button>
                </form>

                <IconButton>
                    <MicNone className='chat__mic' />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
