import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  const login = (
    id,
    name,
    profileImg = "assets/images/logo/user.png"
  ) => {
    //TO DO

    setCurrentUser({
      id,
      name,
      profileImg,
    });
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id,
        name,
        profileImg,
      })
    );
  };
  const logout = () => {
    //TO DO
    setCurrentUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
