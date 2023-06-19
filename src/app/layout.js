import { ClientOnly,Layout } from '../../components';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { StateContext } from '../../context/StateContext';

export const metadata = {
  title: 'Ecommerce Store',
  description: 'My best ecommerce selling app',
};


export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ClientOnly>
          <StateContext>
            <Layout>
              <Toaster />
              {children}
            </Layout>
          </StateContext>
        </ClientOnly>
      </body>
    </html>
  )
}


