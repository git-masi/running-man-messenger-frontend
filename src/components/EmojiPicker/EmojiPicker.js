import React, { useState } from "react";

// Components
import { Emoji, Picker } from "emoji-mart";

// CSS
import "emoji-mart/css/emoji-mart.css";
import styles from "./EmojiPicker.module.css";

export default function EmojiPicker(props) {
  const { addEmoji } = props;

  const [showPicker, setShowPicker] = useState(false);

  const handleClick = () => setShowPicker(!showPicker);

  return (
    <div onClick={handleClick} className={styles.wrapper}>
      <Emoji emoji="smile" size={40} />
      <span
        className={styles.picker}
        style={{
          display: showPicker ? "block" : "none",
        }}
      >
        <Picker onSelect={(emoji) => addEmoji(emoji)} />
      </span>
    </div>
  );
}
