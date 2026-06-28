import { Box, Grid, Skeleton, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { addressListUrl, deleteAddressUrl } from "../../../../config/Config";
import {
  setAddressOpen,
  setEditAddress,
} from "../../../../logic/reducers/profileSlice";
import {
  PageSubTitle,
  PageTitle,
  PrimaryButton,
  Wrapper,
} from "../../../../shared/styles/globalStyles";
import {
  AddressButton,
  AddressName,
  AddressPaper,
  NoAddressContent,
  Tag,
  TextContent,
} from "./Addresses.styles";

const Addresses = () => {
  const dispatch = useDispatch();
  const { addressOpen } = useSelector((state) => state.profile);
  const [loader, setLoader] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);

  useEffect(() => {
    addressList();
  }, []);

  useEffect(() => {
    addressList();
  }, [addressOpen]);

  const addressList = () => {
    setLoader(true);
    axios
      .get(addressListUrl)
      .then((res) => {
        if (res?.status === 200) {
          setLoader(false);
          setAddressData([...res?.data]);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Fetching of address list failed`);
      });
  };

  useEffect(() => {
    console.log("addressData", addressData);
  }, [addressData]);

  const deleteAddress = (address) => {
    console.log("addressId:", address);
    const info = {
      addressId: address?.addressId,
    };
    setDeleteLoader(true);
    axios
      .post(deleteAddressUrl, info)
      .then((res) => {
        if (res?.status === 200) {
          setDeleteLoader(false);
          addressList();
          toast.success("Address deleted successfully");
        }
      })
      .catch((err) => {
        console.log("error", err);
        setDeleteLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Deletion of address failed`);
      });
  };

  const editAddress = (address) => {
    console.log("editAddress", address);
    dispatch(setEditAddress(address));
    dispatch(setAddressOpen());
  };

  return (
    <Wrapper>
      <Stack direction="row" justifyContent="space-between" mb={6}>
        <PageSubTitle>Saved Addresses</PageSubTitle>
        <PrimaryButton onClick={() => dispatch(setAddressOpen())}>
          + Add Address
        </PrimaryButton>
      </Stack>
      <Grid container spacing={3}>
        {loader ? (
          Array?.from({ length: 5 }).map((data, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Skeleton variant={"rectangular"} width={"100%"} height={150} />
            </Grid>
          ))
        ) : (
          <>
            {addressData.map((address, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <AddressCard
                  data={address}
                  deleteAddress={() => deleteAddress(address)}
                  editAddress={() => editAddress(address)}
                />
              </Grid>
            ))}
            {addressData?.length === 0 && !loader ? (
              <NoAddressContent>No Addresses Available</NoAddressContent>
            ) : null}
          </>
        )}
      </Grid>
    </Wrapper>
  );
};

const AddressCard = (props) => {
  const {
    data: {
      fullName,
      mobileNumber,
      pincode,
      houseNumber,
      area,
      landmark,
      city,
      state,
      addressType,
      isDefault,
      addressId,
    },
    deleteAddress,
    editAddress,
  } = props;

  return (
    <AddressPaper>
      <Stack flexDirection={"column"} gap={"16px"}>
        <Box>
          <AddressName>
            {fullName}&nbsp;&nbsp;
            {isDefault ? <Tag>Default</Tag> : null}
          </AddressName>
        </Box>
        <Box>
          <TextContent>
            {houseNumber},&nbsp;{area}
          </TextContent>
          <TextContent>
            {landmark},&nbsp;{city}
          </TextContent>
          <TextContent>
            {state} - {pincode}
          </TextContent>
          <TextContent>Phone: {mobileNumber}</TextContent>
        </Box>
        <Stack flexDirection="row" justifyContent="flex-end" gap="8px">
          <AddressButton type="edit" onClick={() => editAddress()}>
            Edit
          </AddressButton>
          <AddressButton type="remove" onClick={() => deleteAddress()}>
            Remove
          </AddressButton>
        </Stack>
      </Stack>
    </AddressPaper>
  );
};

export default Addresses;
