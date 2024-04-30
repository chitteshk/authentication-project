import { useHistory } from "react-router-dom";

export const ErrVerification = () => {
  const history = useHistory();

  return (
    <div className="content-container">
      <h1>Uh oh...</h1>
      <p>
        Something went wrong , please try again later!
      </p>
      <button onClick={() => history.push("/signup")}>Go to home page</button>
    </div>
  );
};
