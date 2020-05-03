import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

export default function DisplayMessages(props) {
  const { messages } = props;

  const displayMessages = messages.map((m) => (
    <p key={m.createdAt}>
      {m.name} &mdash; {m.text}
      <span style={{ fontSize: "12px", color: "#666", display: "block" }}>
        {m.createdAt}
      </span>
    </p>
  ));

  return <ScrollToBottom>{displayMessages}</ScrollToBottom>;
}
