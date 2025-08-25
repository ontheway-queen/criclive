import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportcricbVitals from './reportcricbVitals';
import { AuthContextProvider } from './Context/AuthContex/AuthContex';
import { VisitorAuthContextProvider } from './Context/AuthContex/VisitorAuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { B2BAuthContextProvider } from './Context/AuthContex/B2BAuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const clientId =
  '189748869714-gss8qvk5rdth8ovj4redujhel2o7gmle.apps.googleusercontent.com';
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <VisitorAuthContextProvider>
        <AuthContextProvider>
          <B2BAuthContextProvider>
            {' '}
            <App />
          </B2BAuthContextProvider>
        </AuthContextProvider>
      </VisitorAuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportcricbVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportcricbVitals();
