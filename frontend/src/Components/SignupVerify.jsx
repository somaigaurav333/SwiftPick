import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axios_instance from '../axios';
const SignupVerify = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // Send the verification token to the server
                const response = await axios_instance.post(`/auth/verifySignup/${token}`);
                if(response.status == 200){
                    navigate('/auth/login');
                }

            } catch (error) {
                console.error(error);
            }
        };

        verifyEmail();
    }, [token]);
    return (
        <h2>Verifying Email...</h2>
    )
}

export default SignupVerify