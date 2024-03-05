//app\[lang]\signup\page.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import Head from 'next/head';
import 'hive/styles/signup.css';
import Image from 'next/image';
//import hive from '../../../hive/hive.jpeg'
import Link from 'next/link';
import { getDictionary } from '../../../getDictionary';
import { useParams } from '../ParamContext';
import { useEffect, useState } from 'react';

export default function SignUpPage() {
  //   const authService = new AuthService();
  const router = useRouter();

  const params = useParams();
  const [lang, setLang] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTranslation = (key: string, lang: any) => {
    const keys = key.split('.');
    let value = lang;

    for (const k of keys) {
      if (typeof value !== 'object' || value === null) return key; // Ensure value is an object and not null
      value = value[k];
      if (!value) return key; // Fallback to key if not found
    }

    return value;
  };

  useEffect(() => {
    console.log('Params lang has changed', params.lang); // To debug

    const fetchData = async () => {
      setIsLoading(true);
      const result = await getDictionary(params.lang);
      setLang(result);
      setIsLoading(false);
    };

    fetchData();
  }, [params.lang]);

  return (
    <div className="main-log">
      <Head>
        <title>{getTranslation('form.signUp', lang) || 'Loading...'}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

      <div className="container" id="container">
        <div className="form-container log-in-container">
          <form>
            <h1>{getTranslation('form.hivesignup', lang) || 'Loading...'}</h1>

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
            <input
              type="email"
              placeholder="Email"
              name="mail"
              className="int"
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              name="mob"
              className="int"
            />

            <button style={{ cursor: 'pointer' }}>
              {getTranslation('form.signUp', lang) || 'Loading...'}
            </button>

            <Link href="/">
              <span>
                {getTranslation('form.alreadyacc', lang) || 'Loading...'}
              </span>{' '}
              <span style={{ fontWeight: 'bold' }}>
                {getTranslation('form.signin', lang) || 'Loading...'}
              </span>
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
}
