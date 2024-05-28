'use client';
import React, { use, useEffect } from 'react'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from "react-notifications";
import ReduxProvider from '@/store/Provider';

const App = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
      <ReduxProvider> 
        {children}
        <NotificationContainer />
      </ReduxProvider>  
  )
}

export default App