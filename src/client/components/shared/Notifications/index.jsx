import React, { createContext, useState } from 'react';
import Alert from '@material-ui/lab/Alert';

export const NotificationContext = createContext();

const NotificationProvider = ({children}) => {
  const [notification, setNotification] = useState(null);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {notification ? (
 
        <Alert  severity={notification.type} onClose={() => setNotification(false)} >
          {notification.message}
        </Alert>
      ) : null}

      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;