import { Box, Stack } from "@mui/material";
import { BoldText } from "../../../shared/styles/globalStyles";
import {
  CustomPaper,
  CustomSubPaper,
  CustomTitle,
  TextItem,
} from "../Checkout.styles";

const PriceSummary = (props) => {
  const { deliveryFee, orderCost } = props;

  return (
    <CustomPaper>
      <CustomTitle>Price Summary</CustomTitle>
      <CustomSubPaper>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <TextItem>Sub Total</TextItem>
          <TextItem>Rs. {orderCost}</TextItem>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <TextItem>Shipping Cost</TextItem>
          <TextItem>Rs. {deliveryFee}</TextItem>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <TextItem>Total</TextItem>
          <TextItem>
            <BoldText>Rs. {Number(orderCost) + Number(deliveryFee)}</BoldText>
          </TextItem>
        </Stack>
      </CustomSubPaper>
    </CustomPaper>
  );
};

export default PriceSummary;
