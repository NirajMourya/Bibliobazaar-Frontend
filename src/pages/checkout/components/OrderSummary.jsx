import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import axios from "axios";

import {
  CustomPaper,
  CustomTitle,
  Delete,
  Description,
  Image,
  NoData,
  OrderSummaryWrapper,
  Price,
  Quantity,
  TextContent,
  TextContent2,
  TextContent3,
  TextItem,
} from "../Checkout.styles";
import { deleteFromCartUrl } from "../../../config/Config";
import { updateCart } from "../../../logic/reducers/userSlice";

const OrderSummary = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [deleteLoader, setDeleteLoader] = useState(false);

  const deleteItemFromCart = (item) => {
    console.log("item", item);
    const info = {
      id: item?._id,
    };
    axios
      .post(deleteFromCartUrl, info)
      .then((res) => {
        setDeleteLoader(true);
        if (res?.status === 200) {
          dispatch(updateCart(res?.data));
          setDeleteLoader(false);
          toast.success("Item deleted from cart successfully");
        }
      })
      .catch((err) => {
        console.log("error", err);
        setDeleteLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Deleting item from cart failed`);
      });
  };

  return (
    <CustomPaper>
      <CustomTitle>Order Summary</CustomTitle>
      <OrderSummaryWrapper>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextContent>Image</TextContent>
          <TextContent2>Description</TextContent2>
          <TextContent>Quantity</TextContent>
          <TextContent>Price</TextContent>
          <TextContent3>Action</TextContent3>
        </Stack>
        {user?.cart?.contents?.map((item, index) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            key={index}
          >
            <Image>
              <img src={item?.bookImage} alt="" width={50} height={50} />
            </Image>
            <Description>
              <Stack direction="column">
                <Typography>{item?.bookAuthor}</Typography>
                <Typography>{item?.bookName}</Typography>
                <Typography>ISBN: {item?.isbn}</Typography>
              </Stack>
            </Description>
            <Quantity>
              <Typography>1</Typography>
            </Quantity>
            <Price>
              <Typography>Rs. {item?.rent}</Typography>
            </Price>
            <Delete>
              <DeleteIcon onClick={() => deleteItemFromCart(item)} />
            </Delete>
          </Stack>
        ))}
        {user?.cart?.contents?.length === 0 ? (
          <NoData>Cart is empty</NoData>
        ) : null}
      </OrderSummaryWrapper>
    </CustomPaper>
  );
};

export default OrderSummary;
