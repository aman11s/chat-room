import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";

export const Header = () => {
  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  return (
    <>
      <h1 className="my-4">
        chathouse
        <span className="pl-1" role="img" aria-label="chat">
          💬
        </span>
      </h1>
      {token && <button className="btn error-btn logout-btn">Logout</button>}
    </>
  );
};
