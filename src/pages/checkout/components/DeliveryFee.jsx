import { Radio, Stack } from "@mui/material";
import { useState } from "react";
import {
  CustomPaper,
  CustomSubPaper,
  CustomTitle,
  TextItem,
} from "../Checkout.styles";

const DeliveryFee = (props) => {
  const { deliveryFee, setDeliveryFee } = props;

  const handleChange = (event) => {
    setDeliveryFee(event?.target?.value);
  };

  return (
    <CustomPaper>
      <CustomTitle>Select Delivery Fee</CustomTitle>
      <CustomSubPaper>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <TextItem>
            <Radio
              checked={Number(deliveryFee) === 20}
              onChange={handleChange}
              value={20}
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
            Normal
          </TextItem>
          <TextItem>Rs. 20</TextItem>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <TextItem>
            <Radio
              checked={Number(deliveryFee) === 50}
              onChange={handleChange}
              value={50}
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
            Speed
          </TextItem>
          <TextItem>Rs. 50</TextItem>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <TextItem>
            <Radio
              checked={Number(deliveryFee) === 100}
              onChange={handleChange}
              value={100}
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
            Super Fast
          </TextItem>
          <TextItem>Rs. 100</TextItem>
        </Stack>
      </CustomSubPaper>
    </CustomPaper>
  );
};

export default DeliveryFee;
