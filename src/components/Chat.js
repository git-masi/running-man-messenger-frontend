// Modules
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import qs from "qs";

// Utils
import useInputState from "../hooks/useInputState";

// Components
import DisplayMessages from "./DisplayMessages/DisplayMessages";
import EmojiPicker from "./EmojiPicker/EmojiPicker";

// CSS
import "emoji-mart/css/emoji-mart.css";

let socket;

export default function Chat({ location }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage, resetMessage, setMessageValue] = useInputState(
    ""
  );
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const endPoint = "http://127.0.0.1:3333";

  useEffect(() => {
    const { name, room } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    socket = io(endPoint);

    socket.emit("join", { name, room }, (err) => {
      if (err) return console.log(err);
      setName(name);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    });
  }, []);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const addEmoji = (emoji) => {
    setMessageValue((prevState) => `${prevState}${emoji.native}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("newMessage", message, (err) => {
      if (err) return console.log(err);
      resetMessage();
    });
    e.target.querySelector('[name="newMessage"]').focus();
  };

  const displayUsers = users.map((u) => <p key={u.id}>{u.name}</p>);

  return (
    <section>
      <h1>Chat</h1>

      <div>{displayUsers}</div>

      <DisplayMessages name={name} messages={messages} />

      <form onSubmit={handleSubmit}>
        <label>
          Message
          <input
            required
            type="text"
            name="newMessage"
            placeholder="Type your message"
            value={message}
            onChange={setMessage}
          />
        </label>

        <EmojiPicker addEmoji={addEmoji} />

        <button type="submit">Send</button>
      </form>
    </section>
  );
}
