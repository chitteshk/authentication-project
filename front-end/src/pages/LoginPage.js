import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const LoginPage = () => {
    const [, setToken] = useToken(); //use destructing to get required part of the custom hook , we do not need token here only setToken so we destructure accordinly.
    const [errorMessage, setErrorMessage] = useState('')
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassWord, setInputPassWord] = useState("");

  const history = useHistory();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setErrorMessage(false);
    },3000)
    return () => clearTimeout(timeOut);
  },[errorMessage])

  const onLoginClicked = async () => {
    try {
      const response = await axios.post('/api/login', {
        email: inputEmail,
        password: inputPassWord
      });
  
        const { token } = response.data;
        setToken(token);
        history.push('/');
    } catch (error) {
        setErrorMessage('The Login credentials do not match any account on our site. Try again with correct email and password!');
      
    }
  };
  

  return (
    <div className="content-container">
      <h1>Log In</h1>
      {errorMessage && <div className = "fail">{errorMessage}</div> }
      <input
        value={inputEmail}
        onChange={(event) => setInputEmail(event.target.value)}
        placeholder="someone@gmail.com"
      />
      <input
        value={inputPassWord}
        onChange={(event) => setInputPassWord(event.target.value)}
        type="password"
        placeholder="Password"
      />
      <hr/>
      <button disabled={!inputEmail && !inputPassWord} onClick={onLoginClicked}>
        Log In
      </button>
      <button onClick={() => history.push("/forgot-password")}>
        Forgot password ?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have an account ? Sign Up !
      </button>
    </div>
  );
};
