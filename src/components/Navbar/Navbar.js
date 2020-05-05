// Modules
import React from "react";

import { NavLink } from "react-router-dom";

// CSS
import styles from "./Navbar.module.css";

export default function NavBar(props) {
  const { title } = props;
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <img
          className={styles.logo}
          src="https://gitmasi.com/assets/running-man-logo/running-man-logo.png"
          alt="logo"
        />
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.navContent}>
        <NavLink className={styles.navlink} to="/">
          Sign Out
        </NavLink>
        <NavLink className={styles.navlink} to="/">
          About
        </NavLink>
        <button className={styles.settingsButton}>
          <object
            style={{ color: "white" }}
            type="image/svg+xml"
            data="https://gitmasi.com/assets/icons/gear-icon-white.svg"
            width="30"
            height="30"
          ></object>
        </button>
      </div>
    </nav>
  );
}
