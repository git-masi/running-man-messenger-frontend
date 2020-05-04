// Modules
import React from "react";

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
    </nav>
  );
}
