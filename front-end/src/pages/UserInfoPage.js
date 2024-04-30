import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";
import axios from "axios";

export const UserInfoPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const history = useHistory();

  const { id, email, isVerified,info } = user;

  const [skinColor, setSkinColor] = useState(info.skinColor || "");
  const [hairColor, setHairColor] = useState(info.hairColor || "");
  const [bio, setBio] = useState(info.bio || "");

  // State variables for showing messages
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showEmptyFieldMessage, setShowEmptyFieldMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
      setShowEmptyFieldMessage(false); // Reset empty field message too
    }, 3000);
    return () => clearTimeout(timer);
  }, [showSuccessMessage, showErrorMessage, showEmptyFieldMessage]);

  const saveChanges = async () => {
    if (!hairColor || !skinColor || !bio) {
      setShowEmptyFieldMessage(true); // Show message for empty fields
      return; // Return early without making the API request
    }

    try {
      const response = await axios.put(
        `/api/users/${id}`,
        {
          hairColor,
          skinColor,
          bio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { token: newToken } = response.data;
      setToken(newToken);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    history.push("/login");
  };

  const resetValues = () => {
    setSkinColor(info.skinColor);
    setHairColor(info.hairColor);
    setBio(info.bio);
  };

  return (
    <div className="content-container">
      <h1>Info for {email}</h1>
      {!isVerified && (
        <div className="fail">You won't be able to save any changes until your account is verified.</div>
      )}
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showEmptyFieldMessage && (
        <div className="fail">Please fill in all the fields!</div>
      )}
      {showErrorMessage && (
        <div className="fail">
          Uh oh... something went wrong and we couldn't save changes
        </div>
      )}
      <label>
        Skin Color:
        <input
          onChange={(e) => setSkinColor(e.target.value)}
          value={skinColor}
        />
      </label>
      <label>
        Hair Color:
        <input
          onChange={(e) => setHairColor(e.target.value)}
          value={hairColor}
        />
      </label>
      <label>
        Bio:
        <input onChange={(e) => setBio(e.target.value)} value={bio} />
      </label>
      <hr />
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={resetValues}>Reset Values</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
