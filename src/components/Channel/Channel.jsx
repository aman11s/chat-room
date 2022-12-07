import React from "react";
import "./Channel.css";

export const Channel = () => {
  return (
    <div className="channel mx-auto">
      <div className="messages"></div>
      <form className="msg-form mb-3">
        <input placeholder="type what's in your mind" type="text" />
        <button className="ml-2 send-msg-btn">Send</button>
      </form>
    </div>
  );
};
