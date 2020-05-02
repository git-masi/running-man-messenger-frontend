import React, { useEffect } from "react";
import io from "socket.io-client";
import qs from "qs";

let socket;

export default function Chat({ location }) {
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

  return <h1>Chat</h1>;
}
