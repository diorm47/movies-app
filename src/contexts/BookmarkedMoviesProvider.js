import { createContext, useContext } from "react";

const BookmarkedMoviesContext = createContext([]);

export const BookmarkedMoviesProvider = ({ children, ...props }) => {
  return (
    <BookmarkedMoviesContext.Provider value={props.context}>
      {children}
    </BookmarkedMoviesContext.Provider>
  );
};

export function useBookmarkedMovies() {
  const context = useContext(BookmarkedMoviesContext);
  return context;
}
