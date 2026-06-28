import React, { useState} from "react";
const BookContext = React.createContext({
  AddBookOpen:false,
  bookData: {},
  onBookSelect: () => {},
  onBookUnSelect: () => {},
});

export const BookContextProvider = (props) => {
    const [AddBookOpen, setAddBookOpen] = useState(false);

    const BookSelectHandler = (data) => {
      bookData = data
      setAddBookOpen(true);
    };
    const BookUnSelectHandler = () => {
      bookData = {}
      setAddBookOpen(false);
    };
    return (
      <BookContext.Provider
       value={{
          isLoggedIn: AddBookOpen,
          onBookSelect: BookSelectHandler,
          onBookUnSelect: BookUnSelectHandler,
       }}
      >
         {props.children}
      </BookContext.Provider>
    );
  };