'use client';
import React from 'react'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from "react-notifications";

const App = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
        {children}
        <NotificationContainer />
    </div>
  )
}

export default App