import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { BsFacebook } from 'react-icons/bs';

const FacebookLoginButton = () => {
  const responseFacebook = (response: any) => {
    console.log(response);
  };
  return (
    <>
      <FacebookLogin
        appId='957269138782400'
        autoLoad={true}
        fields='name,email,picture'
        callback={responseFacebook}
        cssClass='my-facebook-button-class'
        icon={<BsFacebook />}
      />
      {/* <BsFacebook /> */}
    </>
  );
};

export default FacebookLoginButton;
