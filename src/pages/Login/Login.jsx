import React from "react";
import { Link } from "react-router-dom";

const formDetails = [
  {
    id: 1,
    label: "Email",
    name: "email",
    type: "text",
  },
  {
    id: 2,
    label: "Password",
    name: "password",
    type: "password",
  },
];

export const Login = () => {
  return (
    <>
      <form className="auth-form">
        <h2>Login</h2>
        {formDetails.map((form) => {
          const { id, label, name, type } = form;
          return (
            <label key={id}>
              <div>{label}</div>
              <input type={type} name={name} placeholder={`Enter ${name}`} />
            </label>
          );
        })}
        <button className="btn primary-btn">Login</button>
        <Link to="/signup" className="link">
          Create an account
        </Link>
      </form>
    </>
  );
};
