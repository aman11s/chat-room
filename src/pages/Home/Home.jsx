import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RoomForm } from "../../components";
import "./Home.css";

export const Home = () => {
  const {
    userData: { username },
  } = useSelector((store) => store.auth);

  const [formModalOpen, setFormModalOpen] = useState(false);

  const openFormModal = () => setFormModalOpen(true);
  const closeFormModal = () => setFormModalOpen(false);

  const formModalClickHandler = (e) => {
    if (
      e.target.tagName === "DIV" &&
      e.target.classList.contains("form-modal")
    ) {
      closeFormModal();
    }
  };

  return (
    <>
      <h3 className="my-4 fw-400">
        Hi <span>{username}</span>
        <span className="pl-1" role="img" aria-label="hand">
          👋
        </span>
      </h3>

      <button
        onClick={openFormModal}
        className="btn primary-btn create-room-btn"
      >
        Create Room
      </button>
      <div
        onClick={formModalClickHandler}
        className={`form-modal ${!formModalOpen && "hide"}`}
      >
        <RoomForm />
      </div>
    </>
  );
};
