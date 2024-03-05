'use client';
import React, { ReactElement, Component, ReactNode, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Loader } from "../../components/Loader/Loader";
import LoginPageWrapper from '../../hive/pages/login';
import { Box } from '@mui/material';
import { NextPage } from 'next';
/* import {Profile} from '../../hive/services/AuthGuard';
import AuthGuard from '../../hive/services/AuthGuard'; */
import Dashboard from '../../hive/pages/dashboard';
import {useRouter} from 'next/navigation';
// import { AppProps } from 'next/app';

const page = () => {
  const router = useRouter();
  //router.push("/dashboard")
  return(<>
    <Dashboard />
  </>) 
};

export default page;
