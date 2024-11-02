import React, { createContext, useState, useContext } from "react";

// Create UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to wrap the entire app
export const UserProvider = ({ children }) => {
  const [userObject, setUserObject] = useState();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [TaskToEdit, setTaskToEdit] = useState();

  const [user, setUser] = useState({
    name: "",
  });

  const [refreshTasks, setrefreshTasks] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [mail, setMail] = useState("");

  const updateUser = (name) => {
    setUser({ ...user, name });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        loggedIn,
        setLoggedIn,
        userObject,
        setUserObject,
        mail,
        setMail,
        isTaskModalOpen,
        setIsTaskModalOpen,
        TaskToEdit,
        setTaskToEdit,
        refreshTasks,
        setrefreshTasks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
