import { Wrapper } from "../../../../shared/styles/globalStyles";
import {
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  NoRecordContent,
  BookTitle,
  BookInfo,
  NavItemDiv,
} from "./rentHistory.styles";
import { IssuedBooksUrl, OfferedBooksUrl } from "../../../../config/Config";
import { useNavigate } from "react-router";

const RentHistory = () => {
  const [books, setBooks] = useState([]);
  const [isOffered, setIsOffered] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getBookData();
  }, []);

  useEffect(() => {
    getBookData();
  }, [isOffered]);

  const getBookData = () => {
    axios
      .get(isOffered ? OfferedBooksUrl : IssuedBooksUrl)
      .then((res) => {
        if (res?.status === 200) {
          console.log(res.data);
          setBooks([...res.data]);
        }
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Fetching offered/issued books list failed`);
      });
  };

  return (
    <Wrapper>
      <Stack direction="row" pt={4} pr={2}>
        <NavItemDiv active={!isOffered} onClick={() => setIsOffered(false)}>
          Issued
        </NavItemDiv>
        <NavItemDiv active={isOffered} onClick={() => setIsOffered(true)}>
          Offered
        </NavItemDiv>
      </Stack>
      {books?.length === 0 && !loader ? (
        <NoRecordContent>No records found.</NoRecordContent>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Book</TableCell>
                <TableCell>Rented On</TableCell>
                <TableCell>Return Date</TableCell>
                {isOffered ? (
                  <>
                    <TableCell>Rented By</TableCell>
                    <TableCell>Rent Received</TableCell>
                    <TableCell>Status</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>Owned By</TableCell>
                    <TableCell>Delivery Status</TableCell>
                    <TableCell>Tracking ID</TableCell>
                    <TableCell></TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {/* <LibraryPaper> */}
                    <Stack
                      flexDirection="row"
                      className="StackTitle"
                      justifyContent="flex-start"
                      gap="16px"
                      alignItems="center"
                    >
                      <img
                        src={row?.imageUrl}
                        alt={row.bookName}
                        width={60}
                        height={60}
                      />
                      <Stack>
                        <BookTitle>{row.bookName}</BookTitle>
                        <BookInfo>{row?.author.join(",")}</BookInfo>
                        <BookInfo>ISBN - {row.isbn}</BookInfo>
                      </Stack>
                    </Stack>
                    {/* </LibraryPaper> */}
                  </TableCell>
                  <TableCell align="left">{row.rentedOn}</TableCell>
                  <TableCell align="left">{row.returnDate}</TableCell>
                  {isOffered ? (
                    <>
                      <TableCell align="left">{row.rentedBy}</TableCell>
                      <TableCell align="left">Rs. {row.rent}</TableCell>
                      <TableCell align="left">{row.rentStatus}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="left">{row.ownerName}</TableCell>
                      <TableCell align="left">{row.deliveryStatus}</TableCell>
                      <TableCell align="left">{row.trackingID}</TableCell>
                      <TableCell
                        align="left"
                        style={{ cursor: "pointer", padding: "4px 12px" }}
                        onClick={() => {
                          navigate(`/rentDetail/${row?.rentId}`);
                        }}
                      >
                        View Details
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Wrapper>
  );
};

export default RentHistory;
