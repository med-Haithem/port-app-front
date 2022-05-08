import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "antd";

const Login = () => {
  const [error, setError] = useState("");
  const history = useNavigate();
  const [values, setValues] = useState({ Email: "", Password: "" });
  const postdata = (e) => {
    e.preventDefault();
    axios
      .post("https://port-app-tn.herokuapp.com/api/auth/login", values)
      .then((data) => {
        localStorage.setItem("token", data.data.data.access_token);
        history("/user/camions");
        setValues({ Email: "", Password: "" });
      })
      .catch((err) => {
        setValues({ Email: "", Password: "" });
        setError(err.response.data.message);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="login-dark">
        <form method="post" onSubmit={postdata}>
          <h2 className="sr-only">Login Form</h2>
          <div className="illustration">
            <i className="icon ion-ios-locked-outline"></i>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="Email"
              required
              placeholder="enter your Email"
              value={values.Email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="Password"
              required
              placeholder="enter your Password"
              value={values.Password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Log In
            </button>
          </div>
          {error && <Alert message={error} type="error" />}
          <a href="/register" className="forgot">
            Create New Account
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
