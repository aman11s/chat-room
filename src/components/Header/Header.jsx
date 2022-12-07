import React from "react";
import { useSelector } from "react-redux";
import { logoutHandler } from "../../features";
import { useDispatch } from "react-redux";
import "./Header.css";

export const Header = () => {
  const { userData } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  return (
    <>
      <h1 className="my-4">
        chathouse
        <span className="pl-1" role="img" aria-label="chat">
          💬
        </span>
      </h1>
      {userData?.token && (
        <button
          onClick={() => dispatch(logoutHandler())}
          className="btn error-btn logout-btn"
        >
          Logout
        </button>
      )}
    </>
  );
};
