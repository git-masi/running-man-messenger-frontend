import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

export default function DisplayMessages(props) {
  const { name, messages } = props;

  const normalizeString = (str) => str.trim().toLowerCase();

  const displayMessages = messages.map((m) => (
    <p
      key={m.createdAt}
      className={
        normalizeString(name) === normalizeString(m.name) ? "isUser" : null
      }
    >
      {m.name} &mdash; {m.text}
      <span style={{ fontSize: "12px", color: "#666", display: "block" }}>
        {m.createdAt}
      </span>
    </p>
  ));

  return <ScrollToBottom>{displayMessages}</ScrollToBottom>;
}
