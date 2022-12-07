import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupHandler } from "../../features";
import { Navigate, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const signupFormDetails = [
  {
    id: 1,
    label: "Username",
    name: "username",
    type: "text",
  },
  {
    id: 2,
    label: "Email",
    name: "email",
    type: "text",
  },
  {
    id: 3,
    label: "Password",
    name: "password",
    type: "password",
  },
];

const initialFormDetails = {
  username: "",
  email: "",
  password: "",
};

export const Signup = () => {
  const [formDetails, setFormDetails] = useState(initialFormDetails);

  const dispatch = useDispatch();
  const { userData, status } = useSelector((store) => store.auth);
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const changeHandler = (e) => {
    setFormDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(signupHandler({ formData: formDetails }));
    setFormDetails(initialFormDetails);
  };

  return (
    <>
      {userData?.token && <Navigate to={from} replace />}
      <form onSubmit={submitHandler} className="auth-form">
        <h2>Sign up</h2>
        {signupFormDetails.map((form) => {
          const { id, label, name, type } = form;
          return (
            <label key={id}>
              <div className="text-left">{label}</div>
              <input
                onChange={changeHandler}
                required
                value={formDetails[name]}
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
            "Signup"
          )}
        </button>
        <Link to="/login" className="link">
          Already have an account
        </Link>
      </form>
    </>
  );
};
