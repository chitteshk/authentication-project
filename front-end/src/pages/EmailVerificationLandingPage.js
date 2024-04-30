import { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { ErrVerification } from './ErrVerification';
import { SuccVerification } from './SuccVerification';

export const EmailVerificationLandingPage = () => {
    const [isLoading , setIsLoading] =useState(true);
    const [isSuccess,setIsSuccess]= useState(false)
    const {verificationString} = useParams();
    const [,setToken] =useToken();
    
useEffect(()=>{
    const loadVerification = async() => {
        try {
            const response  = await axios.put('/api/verify-email',{
                verificationString
            })
            const { token } = response.data;
            setToken(token);
            setIsLoading(false);
            setIsSuccess(true);
        } catch (error) {
            setIsLoading(false);
            setIsSuccess(false);
        }
    }
    loadVerification();
},[setToken, verificationString])

    if(isLoading) return <div>Loading...</div>
    if(!isSuccess) return <ErrVerification/>

    return <SuccVerification/>
 }
