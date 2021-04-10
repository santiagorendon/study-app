import React from 'react';
import Home from './components/Pages/Home';
import NotificationProvider from '../client/components/shared/Notifications';
import './app.css';

const App = () => {
  return (
    <NotificationProvider  >

      <Home />
    </NotificationProvider>

  )
}

export default App;

