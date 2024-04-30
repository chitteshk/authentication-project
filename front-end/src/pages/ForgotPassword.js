import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [, setToken] = useToken();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(false);
      setSuccess(false);
    }, 3000);
  
    return () => clearTimeout(timeoutId);
  }, [error, success]);
  

  const onSubmitClicked = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/forgot-password", {
        email: emailValue,
      });

      // Handle response data as needed
      const { token } = response.data;
      setToken(token);
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="content-container">
      <h1>Forgot password ?</h1>
      {success && (
        <div className="success">
          We have sent a link to you on your registered email id , please follow
          the email to reset your password.
        </div>
      )}
      {error && (
        <div className="fail">
          This email id is not registered with us. Please enter a registered
          email!
        </div>
      )}
      <p>
        Please provide your registered email Id. We will help you reset your
        password.
      </p>
      <input
        value={emailValue}
        onChange={(event) => setEmailValue(event.target.value)}
        placeholder="Enter your registered email id"
      />
      <hr />
      <button
        style={{ display: success ? "none" : "block" }}
        disabled={isLoading}
        onClick={onSubmitClicked}
      >
        {isLoading ? "Submitting.." : "Submit"}
      </button>
    </div>
  );
};
