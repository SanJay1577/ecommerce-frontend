import React, { useState } from "react";
import { signup } from "../authentication/auth.js";
import Base from "../core/Base.js";

const SignupForm = () => {
  //Hooks and States...
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row signup-form">
      <div className="col-md-6 offset-sm-3 text-left">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            Name
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            Email
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            Password
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Submit
          </button>
          <br />
          {success ? (
            <div className="alert alert-success text-center">
              {success} Please click signin
            </div>
          ) : (
            ""
          )}
          {error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

function SignupPage() {
  return (
    <Base
      title="Signup Page"
      description="Please signup and be our valuable customer"
    >
      {SignupForm()}
    </Base>
  );
}

export default SignupPage;
