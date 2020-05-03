// Modules
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import qs from "qs";

// Utils
import useInputState from "../hooks/useInputState";

// Components
import DisplayMessages from "./DisplayMessages/DisplayMessages";

let socket;

export default function Chat({ location }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage, resetMessage] = useInputState("");
  const [name, setName] = useState("");

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
      setMessages((prevState) => [...prevState, msg]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("newMessage", message, (err) => {
      if (err) return console.log(err);
      resetMessage();
    });
    e.target.querySelector('[name="newMessage"]').focus();
  };

  return (
    <section>
      <h1>Chat</h1>

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

        <button type="submit">Send</button>
      </form>
    </section>
  );
}
