import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const ResetSuccessPage = () => {
  const [seconds, setSeconds] = useState(10);
  const history = useHistory();

  useEffect(() => {
    const countInterval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
        history.push("/login"); // Redirect to the desired route
    }
}, [seconds, history]);

  return (
    <div className="content-container">
      <h1>Congratulations!</h1>
      <p>
        Your password has been reset! You will be redirected to login page in{" "}
        {seconds}. If you are not redirected , please 
        <a href="http://localhost:3000/login">click here.</a>
      </p>
    </div>
  );
};
