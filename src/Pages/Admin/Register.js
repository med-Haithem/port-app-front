import React, { useState } from "react";
import "../../Styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";

const Register = () => {
  const history = useNavigate();
  const [values, setValues] = useState({ Name: "", Email: "", Password: "",Role:"ADMIN"});
  const [error, setError] = useState("");
  const postdata = (e) => {
    e.preventDefault();
    axios
      .post("https://port-app-tn.herokuapp.com/api/auth/register", values)
      .then((data) => {
        history("/admin/login");
        setValues({ Name: "", Email: "", Password: "",Role:"ADMIN"});
      })
      .catch((err) => {
        setValues({ Name: "", Email: "", Password: "" ,Role:"ADMIN"});
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
          <h2 className="sr-only">Register Form for admin</h2>
          <div className="illustration">
            <i className="icon ion-ios-locked-outline"></i>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="Name"
              required
              placeholder="enter your name"
              value={values.Name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="Email"
              required
              placeholder="Email"
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
              placeholder="Password"
              value={values.Password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Register
            </button>
          </div>
          {error && <Alert message={error} type="error" />}
          <a href="/admin/login" className="forgot">
            You have an account as admin?Login
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;
