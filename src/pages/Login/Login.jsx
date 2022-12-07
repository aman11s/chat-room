import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { loginHandler } from "../../features";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const loginFormDetails = [
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

export const Login = () => {
  const [formDetails, setFormDetails] = useState(initialFormDetails);

  const {
    userData: { token },
    status,
  } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const changeHandler = (e) => {
    setFormDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginHandler({ formData: formDetails }));
    setFormDetails(initialFormDetails);
  };

  return (
    <>
      {token && <Navigate to={from} replace />}
      <form onSubmit={submitHandler} className="auth-form">
        <h2>Login</h2>
        {loginFormDetails.map((form) => {
          const { id, label, name, type } = form;
          return (
            <label key={id}>
              <div className="text-left">{label}</div>
              <input
                onChange={changeHandler}
                value={formDetails[name]}
                required
                type={type}
                name={name}
                placeholder={`Enter ${name}`}
              />
            </label>
          );
        })}
        <button className="btn primary-btn">
          {status === "pending" ? (
            <ClipLoader color="#fff" speedMultiplier={2} size={14} />
          ) : (
            "Login"
          )}
        </button>
        <Link to="/signup" className="link">
          Create an account
        </Link>
      </form>
    </>
  );
};
