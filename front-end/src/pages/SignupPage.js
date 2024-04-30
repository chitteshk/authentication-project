import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useToken } from "../auth/useToken";
import axios from 'axios';

export const SignupPage = () => {
    const [signupLoading, setSignupLoading] = useState(false);
    const [, setToken] =useToken();
    const [errorMessage, setErrorMessage] = useState('')
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassWord, setInputPassWord] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");

  const history = useHistory();

  const onSignUpClicked = async() => {
    setSignupLoading(true);
    try {
        const response = await axios.post('/api/signup',{
            "email" : inputEmail,
            "password": inputPassWord
        });
        if ( response ) {
            const { token } = response.data;
            setToken(token);
            history.push('/please-verify');
            setSignupLoading(false);
        }
        
    } catch (error) {
        setErrorMessage('Unknown error occured while creating your account . Please try again later!');
        setSignupLoading(false);
    }

  };

  return (
    <div className="content-container">
      <h1>Sign  up</h1>
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
        <input
        value={confirmPassWord}
        onChange={(event) => setConfirmPassWord(event.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <hr/>
      <button disabled={!inputEmail || !inputPassWord || (inputPassWord !== confirmPassWord)} onClick={onSignUpClicked}>
        {signupLoading ? 'Loading ...' : 'Sign Up'}
      </button>
      <button onClick={() => history.push("/login")}>
        Already have an account ? Log In !
      </button>
    </div>
  );
};
