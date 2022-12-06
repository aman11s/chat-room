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

export const Signup = () => {
  return (
    <>
      <form className="auth-form">
        <h2>Sign up</h2>
        {formDetails.map((form) => {
          const { id, label, name, type } = form;
          return (
            <label key={id}>
              <div>{label}</div>
              <input type={type} name={name} placeholder={`Enter ${name}`} />
            </label>
          );
        })}
        <button>Singup</button>
        <Link className="link">Already have an account</Link>
      </form>
    </>
  );
};
