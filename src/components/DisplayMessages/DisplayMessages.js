// Modules
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// CSS
import styles from './DisplayMessages.module.css';

export default function DisplayMessages(props) {
  const { name, messages } = props;

  const [userAtEndOfMessages, setUserAtEndOfMessages] = useState(true);

  const normalizeString = (str) => str.trim().toLowerCase();

  const messageContainer = useRef(null);
  const endOfMessages = useRef(null);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setUserAtEndOfMessages(true);
        } else {
          setUserAtEndOfMessages(false);
        }
      });
    };

    let options = {
      root: messageContainer.current,
      rootMargin: '0px',
      threshold: 0.9,
    };

    let observer = new IntersectionObserver(callback, options);

    observer.observe(endOfMessages.current);
  }, []);

  useEffect(() => {
    const el = messageContainer.current;
    const scrollHeight =
      el.scrollHeight; /** This number increases as new messages come in */
    const clientHeight =
      el.clientHeight; /** This number is stactic, based on height in browser */

    if (scrollHeight - clientHeight && userAtEndOfMessages)
      el.scrollTo(0, scrollHeight);
  }, [messages, userAtEndOfMessages]);

  const displayMessages = messages.map((m) => (
    <p
      key={uuidv4()}
      className={
        normalizeString(name) === normalizeString(m.name)
          ? [styles.isUser, styles.message].join(' ')
          : styles.message
      }
    >
      {m.name} &mdash; {m.text}
      <span className={styles.timestamp}>{m.createdAt}</span>
    </p>
  ));

  return (
    <div ref={messageContainer} className={styles.messages}>
      {displayMessages}
      <div ref={endOfMessages} className={styles.endOfMessages}></div>
    </div>
  );
}
