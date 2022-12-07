import React from "react";
import { useSelector } from "react-redux";
import { Channel } from "../../components";
import "./Home.css";

export const Home = () => {
  const {
    userData: { username },
  } = useSelector((store) => store.auth);

  return (
    <>
      <h3 className="my-4 fw-400">
        Hi <span>{username}</span>
        <span className="pl-1" role="img" aria-label="hand">
          👋
        </span>
      </h3>

      <Channel />
    </>
  );
};
