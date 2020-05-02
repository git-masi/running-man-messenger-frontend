// Modules
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import qs from "qs";

// Utils
import useInputState from "../hooks/useInputState";

let socket;

export default function Chat({ location }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useInputState("");

  const endPoint = "http://127.0.0.1:3333";

  useEffect(() => {
    const { name, room } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    socket = io(endPoint);

    socket.emit("join", { name, room }, (err) => {
      if (err) console.log(err);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("connectSucess", (msg) => {
      console.log(msg.text);
    });
  }, []);

  useEffect(() => {
    socket.on("newUser", (msg) => {
      console.log(msg.text);
    });
  }, []);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("newMessage", message, (err) => {
      if (err) console.log(err);
    });
  };

  const displayMessages = messages.map((m) => (
    <li key={m.createdAt}>{m.text}</li>
  ));

  return (
    <section>
      <h1>Chat</h1>

      <ul>{displayMessages}</ul>

      <form onSubmit={handleSubmit}>
        <label>
          Message
          <input
            required
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={setMessage}
          />
        </label>

        <button type="submit">Send</button>
      </form>
    </section>
  );
}
