import {
  PrimaryButton,
  Wrapper,
  PageSubTitle,
} from "../../../../shared/styles/globalStyles";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { collectionUrl } from "../../../../config/Config";
import BookSearchModal from "./SearchBook";
import BookAddModal from "./AddBook";
import BookDeleteModal from "./deleteBook";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchBookOpen,
  setDeleteBookOpen,
  setAddBookData,
  setEditModeOpen,
  setAddBookOpen,
} from "../../../../logic/reducers/bookSlice";
import {
  Stack,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import {
  BookButton,
  LibraryPaper,
  BookTitle,
  BookInfo,
  CardImage,
  NoBookContent,
  BookData,
} from "./Library.styles";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(false);
  const { searchBook, addBook, deleteBook, editMode } = useSelector(
    (state) => state.book
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getBookData();
  }, []);

  useEffect(() => {
    getBookData();
  }, [addBook, deleteBook, editMode]);

  const getBookData = () => {
    setLoader(true);
    axios
      .get(collectionUrl)
      .then((res) => {
        if (res?.status === 200) {
          console.log(res);
          setLoader(false);
          if (res.data.length === 0) setBooks([]);
          else setBooks([...res.data[0].books]);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("error", err);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Fetch of my collection books failed`);
      });
  };

  const editBook = (bookData) => {
    var tempData = {
      bookId: bookData?.bookId?._id,
      bookName: bookData?.bookId?.bookName,
      author: bookData?.bookId?.author,
      isbn: bookData?.bookId?.isbn,
      imageUrl: bookData?.bookId?.imageUrl,
      rentedBook: bookData?.rentedBook,
      rentExpected: bookData?.rentExpected,
      availableBook: bookData?.availableBook,
    };
    console.log(bookData);
    dispatch(setAddBookData(tempData));
    dispatch(setEditModeOpen());
    dispatch(setAddBookOpen());
  };
  return (
    <Wrapper>
      <Stack direction="row" justifyContent="space-between" mb={6}>
        <PageSubTitle>Your Collection</PageSubTitle>
        <PrimaryButton onClick={() => dispatch(setSearchBookOpen())}>
          + Add Book
        </PrimaryButton>
      </Stack>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {loader ? (
          Array?.from({ length: 5 }).map((data, index) => (
            <Grid item xs={6} key={index}>
              <Skeleton variant={"rectangular"} width={"100%"} height={150} />
            </Grid>
          ))
        ) : (
          <>
            {books.map((data, index) => (
              <Grid item xs={6} key={index}>
                <LibraryCard
                  bookData={data}
                  deleteBook={() => {
                    dispatch(setAddBookData(data));
                    dispatch(setDeleteBookOpen());
                  }}
                  editBook={() => editBook(data)}
                />
              </Grid>
            ))}
            {books?.length === 0 && !loader ? (
              <NoBookContent>
                No Books available in your collection.
              </NoBookContent>
            ) : null}
          </>
        )}
      </Grid>
      <BookSearchModal open={searchBook} />
      <BookAddModal open={addBook} />
      <BookDeleteModal open={deleteBook} />
    </Wrapper>
  );
};

const LibraryCard = (props) => {
  const {
    bookData: { bookId, rentExpected, availableBook, rentedBook },
    deleteBook,
    editBook,
  } = props;

  return (
    <LibraryPaper>
      <Stack
        direction="row"
        className="StackTitle"
        justifyContent="space-between"
      >
        <Stack>
          <BookTitle>{bookId.bookName}</BookTitle>
          <BookInfo>{bookId?.author.join(",")}</BookInfo>
          <BookInfo>ISBN - {bookId.isbn}</BookInfo>
          {/* <TableContainer>
            <Table>
              <TableRow>
                <TableCell variant="head">Rent Expected</TableCell>
                <TableCell>{rentExpected}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">On Rent</TableCell>
                <TableCell>{rentedBook}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Available</TableCell>
                <TableCell>{availableBook}</TableCell>
              </TableRow>
            </Table>
          </TableContainer> */}
          <Stack direction="column" mt={2} gap={"12px"}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              gap={"16px"}
            >
              <BookData>Rent Expected&nbsp;&nbsp;</BookData>
              <BookData>Rs.{rentExpected}</BookData>
            </Stack>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              gap={"16px"}
            >
              <BookData>On Rent</BookData>
              <BookData>{rentedBook}</BookData>
            </Stack>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              gap={"16px"}
            >
              <BookData>Available Book(s) </BookData>
              <BookData>{availableBook}</BookData>
            </Stack>
          </Stack>
        </Stack>
        <Stack flexDirection={"column"} gap={"24px"}>
          <CardImage
            component="img"
            image={bookId?.imageUrl}
            alt={bookId.bookName}
            width={140}
            height={140}
          />
          <Stack direction="row" justifyContent="flex-end" gap={"12px"}>
            <BookButton type="edit" onClick={() => editBook()}>
              Edit
            </BookButton>
            <BookButton type="remove" onClick={() => deleteBook()}>
              Remove
            </BookButton>
          </Stack>
        </Stack>
      </Stack>
    </LibraryPaper>
  );
};

export default Library;
