import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Login (props) {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = (e) => {
    e.preventDefault();
    Axios.post(`/survivors/login`, {name, password})
      .then((data) => {
        setMessage(data.data.message)
        return data.data
      })
      .then((data) => {
        if (data.success) {
          setTimeout(() => {
            setMessage("Now logging in...")
          }, 800)
          setTimeout(() => {
            setMessage("")
            props.loginSuccess()
          }, 1600)
        }
      })
    e.target.reset();
  };

  return(
    <form onSubmit={login} action="post">
      <div className="form-group">
        <input name="name" type="text" className="form-control" placeholder="Username" required onChange={(e) => setName(e.target.value)} />
        <input name="password" type="password" className="form-control" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <br/>
        <button type="submit" className="btn btn-secondary">Submit</button>
        <br/>
      </div>
      <h4 className="display-7">{message}</h4>
    </form>
  )

};