import { Box, Radio, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import { addressListUrl } from "../../../config/Config";
import { BoldText, PrimaryButton } from "../../../shared/styles/globalStyles";
import {
  CustomPaper,
  CustomTitle,
  DeliveryAddressWrapper,
  NoData,
  TextItem,
} from "../Checkout.styles";
import { setAddressOpen } from "../../../logic/reducers/profileSlice";
import { useDispatch, useSelector } from "react-redux";

const DeliveryAddress = (props) => {
  const { addressSelected, setAddressSelected } = props;
  const { addressOpen } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("a");
  const [addressLoader, setAddressLoader] = useState(false);
  const [addressData, setAddressData] = useState([]);

  const handleChange = (address) => {
    setAddressSelected(address);
  };

  useEffect(() => {
    addressList();
  }, []);

  useEffect(() => {
    setAddressSelected(addressData?.[0] || null);
  }, [addressData]);

  const addressList = () => {
    setAddressLoader(true);
    axios
      .get(addressListUrl)
      .then((res) => {
        if (res?.status === 200) {
          setAddressData([...res?.data]);
        }
        setAddressLoader(false);
      })
      .catch((err) => {
        console.log("error", err);
        setAddressLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Fetching of addresses failed`);
      });
  };

  useEffect(() => {
    addressList();
  }, [addressOpen]);

  return (
    <CustomPaper>
      <CustomTitle>Delivery Address</CustomTitle>
      <DeliveryAddressWrapper>
        {addressLoader ? (
          <Stack py={4} spacing={2}>
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={60} sx={{ borderRadius: "8px" }} />
            ))}
          </Stack>
        ) : (
          <>
            {addressData?.length === 0 ? <NoData>No Addresses found</NoData> : null}
            <Stack py={4} alignItems="flex-start">
              {addressData?.map((item, index) => (
                <Stack direction="row" mb={2} key={index}>
                  <Radio
                    checked={addressSelected?.addressId === item?.addressId}
                    onChange={() => handleChange(item)}
                    value={item}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <TextItem>
                    <BoldText>{item?.fullName}</BoldText> {item?.houseNumber}
                    ,&nbsp;{item?.area}, {item?.landmark}, {item?.city},{" "}
                    {item?.state} - {item?.pincode}, Phone number:{" "}
                    {item?.mobileNumber}
                  </TextItem>
                </Stack>
              ))}
              <Box mt={2}>
                <PrimaryButton onClick={() => dispatch(setAddressOpen())}>
                  + Add Address
                </PrimaryButton>
              </Box>
            </Stack>
          </>
        )}
      </DeliveryAddressWrapper>
    </CustomPaper>
  );
};

export default DeliveryAddress;
