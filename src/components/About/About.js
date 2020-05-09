// Modules
import React from "react";

// Components
import Navbar from "../Navbar/Navbar";

// CSS
import styles from "./About.module.css";

export default function About(props) {
  return (
    <>
      <Navbar {...props} />
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <p>
            The idea for Running Man Messagenger came to me as I was learning
            about websockets and how they could be used to make a real time chat
            application. And though it has not been relevant for many years the
            first thing I associate with real time chat is AIM.
          </p>
          <p>
            {
              'In my childhood AOL Instant Messenger (AIM) was all the rage. And people still used terms like "all the rage". The mascot for that app \u2014 funny, I don\'t think we referred to it as an "app" then \u2014 was called the "running man" hence the name of this app and some of the design elements.'
            }
          </p>
          <p>
            So for those of us who remember AOL as our first foray onto the
            internet, here's to the running man.
          </p>
          <p>
            {" "}
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              {" "}
              Freepik{" "}
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
