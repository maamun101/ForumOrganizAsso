//to keep track the current user (once logged in)

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null ou { id, firstName, lastName, isAdmin, isMember }

  const fetchUserInfo = (userInfo) => { //à appeler pendant login
    setUser(userInfo);
  }
  const eraseUserInfo = () => {   //à appeler pendant logout
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, fetchUserInfo, eraseUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};


// hook personalisé pour accéder le contexte facilement 
export const useUser = () => useContext(UserContext);
