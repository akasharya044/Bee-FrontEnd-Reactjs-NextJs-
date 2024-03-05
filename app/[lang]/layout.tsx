"use client"
import React from 'react';
import { ParamsProvider } from './ParamContext'; // Make sure this path is correct
import { useRouter } from 'next/router'; // Make sure this import is correct


type LayoutProps = {
  children: React.ReactNode;
  params: {
    lang: string;
    // other potential properties of params
  };
}; 


export default function RootLayout({ children, params }: LayoutProps) {

  // Use the ParamsProvider without passing 'value' prop
  return (
   
         <ParamsProvider>
          
          {/* Set the 'lang' attribute on the 'html' tag directly from 'params' */}
          <html lang={params.lang}>
            
            <body>{children}</body>
          </html>
          
        </ParamsProvider>
       
  );
}
