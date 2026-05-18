import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Authcontext = React.createContext();

export const Authprovider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("CravingUser")) || ""
  );
  const [isLogin, setLogin] = useState(!!user);
  const [role, setRole] = useState(user?.role || "");
  

  //hook variable depend
  useEffect(() => {
    setLogin(!!user);
    setRole(user?.role || "");
  }, [user]);

  const value = { user, setUser, isLogin, setLogin, role, setRole };

  return (
    <Authcontext.Provider value={value}>{props.children}</Authcontext.Provider>
  );
};

export const useAuth = () => {
  return useContext(Authcontext);
};
