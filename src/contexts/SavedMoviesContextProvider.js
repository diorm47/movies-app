import { createContext, useContext } from "react";

const SavedMoviesContext = createContext([]);

export const SavedMoviesContextProvider = ({ children, ...props }) => {
  return <SavedMoviesContext.Provider value={props.context}>{children}</SavedMoviesContext.Provider>;
};

export function useSavedMoviesContext() {
  const context = useContext(SavedMoviesContext);
  return context;
}