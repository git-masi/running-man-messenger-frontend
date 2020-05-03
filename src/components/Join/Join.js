// Modules
import React from "react";
import { Link } from "react-router-dom";

// Hooks
import useInputState from "../../hooks/useInputState";

// CSS
import styles from "./Join.module.css";

export default function Join() {
  const [name, setName] = useInputState("");
  const [room, setRoom] = useInputState("");

  const handleLinkClick = (e) => (!name || !room ? e.preventDefault() : null);

  return (
    <main>
      <h1>Join</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Name
          <input
            required
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={setName}
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

        <Link onClick={handleLinkClick} to={`/chat?name=${name}&room=${room}`}>
          <button type="submit">Join Chat</button>
        </Link>
      </form>
    </main>
  );
}
