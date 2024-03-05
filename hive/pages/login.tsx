'use client';
import React, { useEffect } from 'react';
import {
  OidcProvider,
  OidcSecure,
  useOidcAccessToken,
  useOidc
} from '@axa-fr/react-oidc';

import { useRouter } from 'next/navigation';

export default function LoginPageWrapper() {
  const { accessToken, accessTokenPayload } = useOidcAccessToken();
  const router = useRouter();
  
  return <>
      <div className="card text-white bg-info mb-3">
        <div className="card-body">
          <h5 className="card-title">Access Token</h5>
          {<p className="card-text">{JSON.stringify(accessToken)}</p>}
          {accessTokenPayload != null && (
            <p className="card-text">{JSON.stringify(accessTokenPayload)}</p>
          )}
        </div>
      </div>
    </>     

}
