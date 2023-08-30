import { createContext, useContext } from "react";

const defaultUserDetails = {
  name: "",
  email: "",
};

const UserContext = createContext(defaultUserDetails);

export const UserDataProvider = ({ children, ...props }) => {
  return (
    <UserContext.Provider value={props.context}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserDetails() {
  const userDetails = useContext(UserContext);
  return userDetails;
}
