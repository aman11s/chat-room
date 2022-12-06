import React, { useState } from "react";
import { Link } from "react-router-dom";

const signupFormDetails = [
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

const initialFormDetails = {
  email: "",
  password: "",
};

export const Signup = () => {
  const [formDetails, setFormDetails] = useState(initialFormDetails);

  const changeHandler = (e) => {
    setFormDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <form className="auth-form">
        <h2>Sign up</h2>
        {signupFormDetails.map((form) => {
          const { id, label, name, type } = form;
          return (
            <label key={id}>
              <div>{label}</div>
              <input
                onChange={changeHandler}
                value={formDetails[name]}
                type={type}
                name={name}
                placeholder={`Enter ${name}`}
              />
            </label>
          );
        })}
        <button className="btn primary-btn">Singup</button>
        <Link to="/login" className="link">
          Already have an account
        </Link>
      </form>
    </>
  );
};
