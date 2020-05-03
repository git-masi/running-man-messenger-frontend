// Modules
import React from "react";

// CSS
import styles from "./DisplayUsers.module.css";

export default function DisplayUsers(props) {
  const { users } = props;
  const displayUsers = users.map((u) => <p key={u.id}>{u.name}</p>);

  return (
    <div className={styles.users}>
      <h3>Users In Chat</h3>
      {displayUsers}
    </div>
  );
}
