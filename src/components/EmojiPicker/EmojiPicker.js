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
    <span onClick={handleClick} style={{ position: "relative" }}>
      <Emoji emoji="smile" size={16} />
      <Picker
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          display: showPicker ? "block" : "none",
        }}
        onSelect={(emoji) => addEmoji(emoji)}
      />
    </span>
  );
}
