import { useHistory } from "react-router-dom";

export const SuccVerification = () => {
  const history = useHistory();

  return (
    <div className="content-container">
      <h1>Success!</h1>
      <p>
        Thanks for verifying your account . Now you can use all functionalities!
      </p>
      <button onClick={() => history.push("/")}>Go to home page</button>
    </div>
  );
};
