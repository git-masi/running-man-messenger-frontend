// Modules
import React from "react";
import { Link } from "react-router-dom";

// Hooks
import useInputState from "../../hooks/useInputState";

// Components
import Navbar from "../Navbar/Navbar";

// CSS
import styles from "./Join.module.css";

export default function Join(props) {
  const { title } = props;
  const [name, setName] = useInputState("");
  const [room, setRoom] = useInputState("");

  const handleLinkClick = (e) => (!name || !room ? e.preventDefault() : null);

  return (
    <>
      <Navbar title={title} />
      <section className={styles.section}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div>
            <img
              className={styles.logo}
              src="https://gitmasi.com/assets/running-man-logo/running-man-logo.png"
              alt="logo"
            />
          </div>

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

          <Link
            onClick={handleLinkClick}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button type="submit">Join Chat</button>
          </Link>
        </form>
      </section>
    </>
  );
}
