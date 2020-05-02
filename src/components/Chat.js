import React, { useEffect } from "react";
import io from "socket.io-client";
import qs from "qs";

export default function Chat({ location }) {
  const endPoint = "http://127.0.0.1:3333";

  useEffect(() => {
    const { nickname, room } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    let socket = io(endPoint);

    socket.emit("join", { nickname, room }, (err) => {
      console.log(err);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  return <h1>Chat</h1>;
}
