// Modules
import React from "react";

// Components
import ScrollToBottom from "react-scroll-to-bottom";

// CSS
import styles from "./DisplayMessages.module.css";

export default function DisplayMessages(props) {
  const { name, messages } = props;

  const normalizeString = (str) => str.trim().toLowerCase();

  const displayMessages = messages.map((m) => (
    <p
      key={m.createdAt}
      className={
        normalizeString(name) === normalizeString(m.name) ? styles.isUser : null
      }
    >
      {m.name} &mdash; {m.text}
      <span style={{ fontSize: "12px", color: "#666", display: "block" }}>
        {m.createdAt}
      </span>
    </p>
  ));

  return (
    <div className={styles.messages}>
      <ScrollToBottom>{displayMessages}</ScrollToBottom>
    </div>
  );
}
