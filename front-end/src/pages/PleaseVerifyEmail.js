import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const PleaseVerifyEmail = () => {
    const history = useHistory();
    const [seconds, setSeconds] = useState(10); // Initial number of seconds

    // Function to decrement the seconds count
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        // Clear interval when component unmounts
        return () => {
            clearInterval(countdownInterval);
        };
    }, []);

    // Redirect when seconds reach 0
    useEffect(() => {
        if (seconds === 0) {
            history.push("/"); // Redirect to the desired route
        }
    }, [seconds, history]);

    
    const handleClick = () => {
        history.push('/');
    };

    return (
        <div className="content-container">
            <h1>Thanks for signing up.</h1>
            <p>A verification mail has been sent to your email. Please verify your email to access full site functionalities!</p>
            <p>You will be redirected to your account in {seconds} seconds.</p>
            <p>If you do not get redirected, please <a href="#" onClick={handleClick}>click here</a>.</p>
        </div>
    );
};
