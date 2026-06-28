import { Box, Radio, Stack } from "@mui/material";
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
    axios
      .get(addressListUrl)
      .then((res) => {
        setAddressLoader(true);
        if (res?.status === 200) {
          setAddressData([...res?.data]);
        }
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
                <BoldText>{item?.fullName}</BoldText> H. No. 17-101,Upstairs,
                Sector-44 Main Street, Kurnool, Andhra Pradesh, 518501, India,
                Phone number: 9742788996
              </TextItem>
            </Stack>
          ))}
          <Box mt={2}>
            <PrimaryButton onClick={() => dispatch(setAddressOpen())}>
              + Add Address
            </PrimaryButton>
          </Box>
        </Stack>
      </DeliveryAddressWrapper>
    </CustomPaper>
  );
};

export default DeliveryAddress;
