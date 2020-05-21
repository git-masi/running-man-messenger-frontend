// Modules
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import qs from 'qs';

// Utils
import useInputState from '../../hooks/useInputState';

// Components
import DisplayUsers from '../DisplayUsers/DisplayUsers';
import DisplayMessages from '../DisplayMessages/DisplayMessages';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import Navbar from '../Navbar/Navbar';

// CSS
import styles from './Chat.module.css';

let socket;

export default function Chat(props) {
  const { location, title } = props;
  const [messages, setMessages] = useState([]);
  const [message, setMessage, resetMessage, setMessageValue] = useInputState(
    ''
  );
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const endPoint = 'http://127.0.0.1:3333';

  useEffect(() => {
    const { name, room } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    socket = io(endPoint);

    socket.emit('join', { name, room }, (err) => {
      if (err) return console.log(err);
      setName(name);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    });
  }, []);

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const addEmoji = (emoji) => {
    setMessageValue((prevState) => `${prevState}${emoji.native}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('newMessage', message, (err) => {
      if (err) return console.log(err);
      resetMessage();
    });
    e.target.querySelector('[name="newMessage"]').focus();
  };

  return (
    <section className={styles.section}>
      <Navbar title={title} />

      <div className={styles.chatArea}>
        <DisplayUsers users={users} />

        <DisplayMessages name={name} messages={messages} />

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Message
            <input
              required
              type='text'
              name='newMessage'
              placeholder='Type your message'
              value={message}
              onChange={setMessage}
              onKeyPress={(e) =>
                e.key === 'Enter'
                  ? e.target
                      .closest('form')
                      .querySelector("button[type='submit']")
                      .click()
                  : null
              }
            />
          </label>

          <EmojiPicker addEmoji={addEmoji} />

          <button type='submit' className='primary'>
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
