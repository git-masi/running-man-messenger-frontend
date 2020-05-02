import React from "react";
import { Link } from "react-router-dom";

import useInputState from "../hooks/useInputState";

export default function Join() {
  const [nickname, setNickname] = useInputState("");
  const [room, setRoom] = useInputState("");

  const handleLinkClick = (e) =>
    !nickname || !room ? e.preventDefault() : null;

  return (
    <main>
      <h1>Join</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Nickname
          <input
            required
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={setNickname}
          />
        </label>
        <label>
          Room
          <input
            required
            type="text"
            placeholder="Enter the room you'd like to join"
            value={room}
            onChange={setRoom}
          />
        </label>

        <Link
          onClick={handleLinkClick}
          to={`/chat?nickname=${nickname}&room=${room}`}
        >
          <button type="submit">Join Chat</button>
        </Link>
      </form>
    </main>
  );
}
