/*
import React, { FormEvent } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface LoginPageProps {
  handleLogin: (e: FormEvent) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ handleLogin }) => {
  return (
    <div className="main-log">
      <Head>
        <title>My page title</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <div className="container" id="container">
        <div className="form-container log-in-container">
          <form onSubmit={handleLogin}>
            <h1>Hive Sign In</h1>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="int"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="int"
            />
            <div style={{ display: 'flex', marginTop: '5px' }}>
              <input type="checkbox" />
              <label htmlFor="vehicle1"> Remember me</label>
            </div>
            <a href="#">Forgot your password?</a>
            <button style={{ cursor: 'pointer' }}>Sign In</button>
            <Link href="/signup">
              <span>Don t Have an Account ?</span>{' '}
              <span style={{ fontWeight: 'bold' }}>Sign Up</span>
            </Link>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
*/

// hive/components/Login/loginPage.tsx3

// import React from 'react';
// import { useOidc } from '@axa-fr/react-oidc';

// const LoginPage = () => {
//   const { login } = useOidc();

//   return (
//     <div>
//       <button onClick={() => login()}>Login with OIDC</button>
//     </div>
//   );
// };

// export default LoginPage;
