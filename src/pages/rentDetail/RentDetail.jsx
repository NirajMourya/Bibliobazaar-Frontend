import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";

import { rentDetailsUrl } from "../../config/Config";
import { PageTitle, Wrapper } from "../../shared/styles/globalStyles";
import {
  Book,
  DeliveryStatus,
  ImageDiv,
  Label,
  RentDetailWrapper,
  TableHeader,
  TablePaper,
  TextContent,
  TrackId,
  Tracking,
  Value,
} from "./RentDetail.styles";
import Spinner from "../../shared/components/spinner/Spinner";


const RentDetail = () => {
  const { rentId } = useParams();
  const [loader, setLoader] = useState(false);
  const [rentDetails, setRentDetails] = useState({});
  const [address, setAddress] = useState({});

  const rentDetailsData = () => {
    setLoader(true);
    const info = { rentId };
    axios
      .post(rentDetailsUrl, info)
      .then((res) => {
        if (res?.status === 200) {
          console.log("rd", res);
          setRentDetails(res?.data);
          setAddress(JSON.parse(res?.data?.address));
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(
          `Fetching of rent details failed with rentId: ${info?.rentId}`
        );
      });
  };

  useEffect(() => {
    rentDetailsData();
  }, []);

  return (
    <Wrapper>
      <RentDetailWrapper>
        <PageTitle align="center" mb={4}>
          Rent Details
        </PageTitle>
        <Grid container spacing={2}>
          {loader ? (
            <Spinner fullPage />
          ) : (
            <>
              <Grid item xs={12} sm={5}>
                <Paper>
                  <Box p={4}>
                    <Stack flexDirection="column" gap="16px">
                      <Stack flexDirection="row">
                        <TextContent>Rent ID:</TextContent>
                        <TextContent>{rentDetails?._id}</TextContent>
                      </Stack>
                      <Stack flexDirection="row">
                        <TextContent>Shipping Address:</TextContent>
                        <TextContent>
                          {address?.fullName}
                          <br />
                          {address?.houseNumber}
                          <br />
                          {address?.area}
                          <br />
                          {address?.landmark}
                          <br />
                          {address?.city}, {address?.pincode}
                        </TextContent>
                      </Stack>
                      <Stack flexDirection="row">
                        <TextContent>Payment Mode:</TextContent>
                        <TextContent>{rentDetails?.paymentMode}</TextContent>
                      </Stack>
                      <Stack flexDirection="row">
                        <TextContent>Total Amount:</TextContent>
                        <TextContent>{rentDetails?.totalAmount}</TextContent>
                      </Stack>
                      <Stack flexDirection="row">
                        <TextContent>Date & Time:</TextContent>
                        <TextContent>{rentDetails?.rentedOn}</TextContent>
                      </Stack>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={7}>
                <TablePaper>
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <TableHeader>Image</TableHeader>
                    <TableHeader>Book Details</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </Stack>
                  {rentDetails?.books?.map((book, index) => (
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      key={index}
                    >
                      <ImageDiv>
                        <img
                          src={book?.bookId?.imageUrl}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </ImageDiv>
                      <Book>
                        <Stack
                          flexDirection={"column"}
                          gap={"4px"}
                          justifyContent="center"
                        >
                          <Stack flexDirection={"row"}>
                            <Label>Title:&nbsp;</Label>
                            <Value>{book?.bookId?.bookName}</Value>
                          </Stack>
                          <Stack flexDirection={"row"}>
                            <Label>By:&nbsp;</Label>
                            <Value>{book?.bookId?.author?.join(",")}</Value>
                          </Stack>
                          <Stack flexDirection={"row"}>
                            <Label>Qty:&nbsp;</Label>
                            <Value>1</Value>
                          </Stack>
                          <Stack flexDirection={"row"}>
                            <Label>Price:&nbsp;</Label>
                            <Value>{book?.rent}</Value>
                          </Stack>
                        </Stack>
                      </Book>
                      <Tracking>
                        <Stack
                          flexDirection={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Stack
                            flexDirection={"column"}
                            gap={"4px"}
                            justifyContent="center"
                            alignItems={"center"}
                          >
                            <DeliveryStatus>
                              {book?.deliveryStatus}
                            </DeliveryStatus>
                            <TrackId>
                              TrackingID:
                              <br />
                              {rentDetails?.trackingID}
                            </TrackId>
                          </Stack>
                        </Stack>
                      </Tracking>
                    </Stack>
                  ))}
                </TablePaper>
              </Grid>
            </>
          )}
        </Grid>
      </RentDetailWrapper>
    </Wrapper>
  );
};

export default RentDetail;
