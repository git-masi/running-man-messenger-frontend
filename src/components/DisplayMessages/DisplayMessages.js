// Modules
import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// CSS
import styles from './DisplayMessages.module.css';

export default function DisplayMessages(props) {
  const { name, messages } = props;

  const normalizeString = (str) => str.trim().toLowerCase();

  const messageContainer = useRef(null);

  useEffect(() => {
    const el = messageContainer.current;
    const scrollHeight =
      el.scrollHeight; /** This number increases as new messages come in */
    const clientHeight =
      el.clientHeight; /** This number is stactic, based on height in browser */

    if (scrollHeight - clientHeight) el.scrollTo(0, scrollHeight);
  }, [messages]);

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
    </div>
  );
}
