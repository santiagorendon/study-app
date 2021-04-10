import React from 'react';
import Home from './components/Pages/Home';
import StudyRoom from './components/Pages/StudyRoom';

import NotificationProvider from '../client/components/shared/Notifications';
import './app.css';

const App = () => {
  return (
    <NotificationProvider  >

      {/* <Home /> */}
      <StudyRoom/>
    </NotificationProvider>

  )
}

export default App;

