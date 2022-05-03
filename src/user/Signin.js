import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAccesed, signin } from "../authentication/auth.js";
import Base from "../core/Base";

function SiginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    err: "",
    loading: false,
    redireted: false,
  });
  const { user } = isAccesed();
  const { err, loading, redireted } = values;

  const SinginForm = () => {
    const handleSubmit = (event) => {
      event.preventDefault();
      setValues({ ...values, loading: true });
      signin({
        email,
        password,
      })
        .then((data) => {
          if (data.error) {
            setValues({ ...values, err: data.error, loading: false });
          } else {
            authenticate(data, () =>
              setValues({ ...values, redireted: true, loading: false })
            );
          }
        })
        .catch((err) => console.log(err));
    };
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              Email
              <input
                value={email}
                type="email"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              Password
              <input
                value={password}
                type="password"
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success btn-block">
              Submit
            </button>
            <br />
            {err && err ? (
              <div className="alert alert-danger text-center">{err}</div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading....</h2>
        </div>
      )
    );
  };

  const redirectMethod = () => {
    if (redireted) {
      if (user && user.role === 1) {
        return <Redirect to= "/admin/dashboard"/>
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
  };
 
  return (
    <Base title="Sign in Page" description="Please signin to shop">
      {loadingMessage()}
      {SinginForm()}
      { redirectMethod()}
      <div className="row-sm">
        <div className="col-sm-12 text-center">Email: <span className="text-warning">admin@gmail.com</span></div>
        <div className="col-sm-12 text-center">Password: <span className="text-warning">Password@123</span></div>
      </div>
    </Base>
  );
}

export default SiginPage;
