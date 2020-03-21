import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Login () {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = (e) => {
    e.preventDefault();
    Axios.post(`/survivors/login`, {name, password})
      .then((data) => {
        console.log(data.data)
        setMessage(data.data.message)
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
        <h4>{message}</h4>
      </div>
    </form>
  )

};