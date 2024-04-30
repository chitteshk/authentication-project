import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";
import { ResetSuccessPage } from "./ResetSuccessPage";


export const ResetPasswordLandingPage = () => {
    const history = useHistory();
    const [,setToken] = useToken();
    const { resetPasswordString } = useParams();
    const [newPass , setNewPass] = useState('');
    const [success, setSuccess] =useState(false);
    const [error, setError] = useState(false);
    const [ isLoading , setIsLoading] = useState(false);
    const [confirmNewPass , setConfirmNewPass] = useState('');

const onSubmitClicked = async() => {
    setIsLoading(true);
    try {
        const response = await axios.put('/api/reset-password',{
            resetPasswordString: resetPasswordString,
            newPassword: newPass
        });

        const { token } = response.data;
        setToken(token);
        setSuccess(true);
        
    } catch (error) {
        setError(true);
        setIsLoading(false);
    }
}

return (
    !success ?
    <div className="content-container">
      <h1>Reset your password</h1>
      {error && (<div className="fail">Something went wrong! Please try again later</div>)}
      <input
        value={newPass.toLowerCase()}
        onChange={(event)=> setNewPass(event.target.value)}
        type="password"
        placeholder="Enter your new password"
      />
      <input
        value={confirmNewPass.toLowerCase()}
        onChange={(event) => setConfirmNewPass(event.target.value)}
        type="password"
        placeholder="Confirm your new password"
      />
       
      <hr/>
      <button disabled={!newPass || !confirmNewPass || (newPass !== confirmNewPass) || isLoading} onClick={onSubmitClicked}>
       {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      <button disabled={isLoading} onClick={() => history.push("/login")}>
        Cancel
      </button>
    </div>
    :
    <ResetSuccessPage/>
  );
  
}