import { useEffect, useState, useRef, useCallback } from "react";

import Box from "@mui/material/Box";
import { Grid, Typography, Modal, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { toast } from "react-hot-toast";
import { searchBookURL, findBookUrl } from "../../../../config/Config";
import {
  setSearchBookClose,
  setAddBookOpen,
  setAddBookData,
} from "../../../../logic/reducers/bookSlice";
import { PrimaryButton } from "../../../../shared/styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  StyledInputBase,
  BookTitle,
  BookInfo,
  LibraryPaper,
  SearchIconWrapperRight,
} from "./Library.styles";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  // borderRadius: "20px",
  // maxHeight: "550px",
  height: "auto",
  maxHeight: "600px",
  overflow: "auto",
};

export default function BookSearchModal(props) {
  const { searchBook } = useSelector((state) => state.book);
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [startIndex, setstartIndex] = useState(0);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const observer = useRef()
  const lastCardRef = useCallback(node => {
      console.log(node);
      if(loader)
       return
      if(observer.current) 
          observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
               if(entries[0].isIntersecting)
               {
                 setstartIndex(prevStartIndex => prevStartIndex+40)
               }
        })
      if(node)
       observer.current.observe(node)
  },[loader])

  useEffect(() => {
    setBooks([]);
  }, [searchBook]);

  useEffect(() => {
    setLoader(true);
    axios
      .get(searchBookURL + "?q=" + searchValue+"&startIndex="+startIndex)
      .then((res) => {
        if (res?.status === 200) {
          setLoader(false);
          console.log(res.data);
          setBooks([...books,...res.data.books]);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("error", err);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Searching a book from Google Books failed`);
      });
  },[searchValue,startIndex]);

  const selectBook = (data) => {
    console.log(data);
    if (data.isbn) {
      const info = {
        isbn: data.isbn,
      };
      axios
        .post(findBookUrl, info)
        .then((res) => {
          if (res?.status === 200) {
            console.log(res.data);
            if (res.data?.bookFound) {
              toast.error(
                "Book with same ISBN already present in your collection."
              );
            } else {
              setSearchValue(null);
              dispatch(setAddBookData(data));
              dispatch(setAddBookOpen());
              dispatch(setSearchBookClose());
            }
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          console.log("error", err);
          toast.error(err?.message || "Something went wrong");
          throw Error(`Adding a book to db from Google Books API failed`);
        });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Search Book
          <IconButton
            aria-label="close"
            onClick={() => {
              setLoader(false);
              setBooks([]);
              dispatch(setSearchBookClose());
              setSearchValue(null);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        <Search sx={{ display: { xs: "none", sm: "block" } }}>
          {/* <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper> */}
          <StyledInputBase
            placeholder="Books / Author / ISBN"
            inputProps={{ "aria-label": "search" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setBooks([]);
                setstartIndex(0);
                //searchBookFn(searchValue);
                setSearchValue(e.target.value)
              }
            }}
          ></StyledInputBase>
          <SearchIconWrapperRight>
            <SearchIcon onClick={() => {
                   setBooks([]);
                   setstartIndex(0);
                   //searchBookFn(searchValue);
                   //setSearchValue(e.target.value)
            }} />
          </SearchIconWrapperRight>
        </Search>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          mt={2}
        >
          {books.map((data, index) => {
                    if(books.length === index+1)
                    {
                      return <Grid item xs={6} key={index} ref={lastCardRef}>
                        <SearchBookCard
                          bookData={data}
                          selectBook={() => selectBook(data)}
                        />
                      </Grid>
                    }
                    else{
                        return <Grid item xs={6} key={index} >
                        <SearchBookCard
                          bookData={data}
                          selectBook={() => selectBook(data)}
                        />
                        </Grid>
                    }
               })
            }
          <div>{loader && "Loading"}</div>
        </Grid>
      </Box>
    </Modal>
  );
}

const SearchBookCard = (props) => {
  const {
    bookData: { bookName, author, isbn, imageUrl },
    selectBook,
  } = props;

  // console.group(props)
  return (
    <LibraryPaper>
      <Stack
        direction="row"
        className="StackTitle"
        justifyContent="space-between"
      >
        <Stack>
          <BookTitle>{bookName}</BookTitle>
          <BookInfo>{author.join(",")}</BookInfo>
          <BookInfo>ISBN - {isbn}</BookInfo>
        </Stack>
        <img src={imageUrl} alt={bookName} width={100} height={100} />
      </Stack>
      <Stack mt={2} justifyContent="center" alignItems="center">
        <PrimaryButton onClick={() => selectBook()} padding={"4px 24px"}>
          Select
        </PrimaryButton>
      </Stack>
    </LibraryPaper>
  );
};
