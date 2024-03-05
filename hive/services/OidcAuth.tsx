"use client"
import React, { useState } from 'react';
import {
  OidcProvider,
  OidcSecure,
  useOidcAccessToken,
  useOidc,
  useOidcUser
} from '@axa-fr/react-oidc';
import NextLink from 'next/link';
import { Loader } from '../../components/Loader/Loader';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const AuthenticatingError = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      component="span"
    >
      Authenticating error, please click here to -{' '}
      <NextLink href={'/'} passHref>
        <Button className="">Reauthenticate</Button>
      </NextLink>
    </Box>
  );
};
const Authenticating = () => {
  return <Loader />;
};
const Loading = () => {
  return <Loader />;
};
const CallBackSuccess = () => {
  return <Loader />;
};

const userData = async () => {
  /*const { oidcUser } = useOidcUser();
  const identityId = oidcUser?.sub;
  const supplierdata: any = {};
  const tokenR: any | null =
    typeof window !== 'undefined' && sessionStorage.getItem('access_token');
  if (tokenR) {
    supplierdata.email = 'sparvez@valethi.in';
    supplierdata.userrole = rdata.email === 'sparvez@valethi.in' ? 'ops_manager' : 'vendor';
    const supplier_guid: any = '';
    sessionStorage.setItem('identityId', identityId);
    sessionStorage.setItem('supplier_guid', supplier_guid);
    sessionStorage.setItem('supplier_id', '000');
    sessionStorage.setItem('supplier_user_data', JSON.stringify(supplierdata));
  }*/
};

const Profile = () => {

  return null;
};

const TokenWrapper = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useOidcAccessToken();
  const { oidcUser } = useOidcUser();
  const identityId = oidcUser?.sub;
  console.log("oidcUser",identityId,oidcUser);
  const { logout } = useOidc();

  React.useEffect(() => {
    userData();
  }, [accessToken]);

  React.useEffect(() => {
    userData();
    (identityId === "d4df688e-33a5-49c2-bbfc-08dba9fb7945" ? sessionStorage.setItem("role","Ops Manager") : sessionStorage.setItem("role","Vendor"));
  }, [identityId]);
  
  const onIdle = () => {
    sessionStorage.removeItem('supplier_user_data');
    logout();
    //insert any custom logout logic here
  }

  return children;
};
const SessionLost = () => {
  const { logout } = useOidc();
  React.useEffect(() => {
    logout();
  }, [logout]);

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography mt={2} variant="h2">
          Session Lost
        </Typography>
      </Box>
    </Box>
  );
}

const OidcAuth = ({ children }: any) => {
  const [localLoading, setLoacalLoading] = useState<boolean>(true);
  const oidcConfiguration = {
    monitor_session: false,
    client_id: '88ab42e79f090a8ece1c',
    //client_id: 'ca92da62-e689-4143-9605-ea995e03cc58',
    redirect_uri: 'http://localhost:812/en/#authentication/callback',
    scope: 'openid profile email api offline_access',
    //Change this url with you url.
    authority: 'https://identityserver.valethi.dev:5005'
    //authority: 'http://4.224.76.123',
  };
  const handleLoading = () => {
    setLoacalLoading(false);
  };
  return (
    <OidcProvider
      authenticatingComponent={Authenticating}
      loadingComponent={Loading}
      callbackSuccessComponent={CallBackSuccess}
      authenticatingErrorComponent={AuthenticatingError}
      sessionLostComponent={SessionLost}
      configuration={oidcConfiguration}
    >
      <OidcSecure>
        <TokenWrapper>       
          {children}
        </TokenWrapper>
      </OidcSecure>
    </OidcProvider>
  );
};

export default OidcAuth;
