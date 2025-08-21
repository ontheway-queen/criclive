import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { BaseUrl } from '../../Helpers/Constant';

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // const { data } = await axios.get(
        //   `https://www.googleapis.com/oauth2/v3/userinfo`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${response.access_token}`,
        //     },
        //   }
        // );
        if (response) {
          const visitor_google_access_token = response.access_token;
          const res = await axios.post(
            `${BaseUrl}/api/auth/visitor/login-register/with-google`,
            { visitor_google_access_token },
            { withCredentials: true }
          );
          console.log(res);
        }

        console.log(response);
      } catch (error) {}
    },
  });
  return (
    <div>
      <FcGoogle
        size={45}
        color='#F4B400'
        className='login-icon'
        onClick={() => login()}
      />
    </div>
  );
};

export default GoogleLoginButton;
