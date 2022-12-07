import React from "react";
import "./RoomForm.css";

export const RoomForm = () => {
  return (
    <>
      <form className="create-room-form mx-auto">
        <label>
          <div className="text-left">Create Room</div>
          <input
            required
            type="text"
            name="createRoom"
            placeholder="Enter room name"
          />
        </label>
        <button className="btn primary-btn">Submit</button>
      </form>
    </>
  );
};
