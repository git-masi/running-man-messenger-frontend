// Modules
import React from "react";
import { v4 as uuidv4 } from "uuid";

// Components
import ScrollToBottom from "react-scroll-to-bottom";

// CSS
import styles from "./DisplayMessages.module.css";

export default function DisplayMessages(props) {
  const { name, messages } = props;

  const normalizeString = (str) => str.trim().toLowerCase();

  const displayMessages = messages.map((m) => (
    <p
      key={uuidv4()}
      className={
        normalizeString(name) === normalizeString(m.name)
          ? [styles.isUser, styles.message].join(" ")
          : styles.message
      }
    >
      {m.name} &mdash; {m.text}
      <span className={styles.timestamp}>{m.createdAt}</span>
    </p>
  ));

  return (
    <div className={styles.messages}>
      <ScrollToBottom>{displayMessages}</ScrollToBottom>
    </div>
  );
}
