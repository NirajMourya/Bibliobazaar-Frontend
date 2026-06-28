import { Grid, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import {
  checkout,
  completeOrderUrl,
  deleteAllFromCartUrl,
  paymentVerify,
} from "../../config/Config";
import { clearCartContents, updateCart } from "../../logic/reducers/userSlice";
import Spinner from "../../shared/components/spinner/Spinner";

import {
  PageTitle,
  PrimaryButton,
  Wrapper,
} from "../../shared/styles/globalStyles";
import DeliveryAddress from "./components/DeliveryAddress";
import DeliveryFee from "./components/DeliveryFee";
import OrderSummary from "./components/OrderSummary";
import PriceSummary from "./components/PriceSummary";

const Checkout = () => {
  const razorpayId = process.env.REACT_APP_RAZORPAY_ID;
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addressSelected, setAddressSelected] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(20);
  const [orderCost, setOrderCost] = useState(0);
  const [completeOrderLoader, setCompleteOrderLoader] = useState(false);
  const [deleteAllLoader, setDeleteAllLoader] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [razorpayInfo, setRazorPayInfo] = useState({
    razorpayOrderId: "fdasf",
    razorpayPaymentId: "fas",
  });

  useEffect(() => {
    const orderTotal = user?.cart?.contents?.reduce(
      (prev, curr, i) => prev + curr?.rent,
      0
    );
    setOrderCost(orderTotal);
  }, [user]);

  const deleteAllItemsFromCart = () => {
    setDeleteAllLoader(true);
    axios
      .post(deleteAllFromCartUrl, {})
      .then((res) => {
        if (res?.status === 200) {
          dispatch(updateCart(res?.data));
          setDeleteAllLoader(false);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setDeleteAllLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Deleting all items from cart after checkout failed`);
      });
  };

  const makePayment = async (amount) => {
    try {
      console.log("process.env", process.env.REACT_APP_BASE_URL);

      setPaymentLoader(true);
      const { status, data } = await axios.post(checkout, { amount });
      setPaymentLoader(false);

      if (status === 200) {
        const options = {
          key: razorpayId,
          amount: data.amount,
          currency: "INR",
          name: "RazorPay Test",
          description: "Bibliobazar payment description",
          image: "https://avatars.githubusercontent.com/u/25058652?v=4",
          order_id: data.id,
          // callback_url: "http://localhost:8080/payment/verify",
          handler: function (response) {
            paymentVerifyFn(response);
          },
          prefill: {
            name: "Yathendra",
            email: "yathendra@example.com",
            contact: "9742788996",
          },
          notes: {
            address: "BiblioBazaar Corporate Office",
          },
          theme: {
            color: "#9A98F0",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (e) {
      console.log(e);
      throw Error(`Payment Failed`);
    }
  };

  const paymentVerifyFn = async (response) => {
    try {
      console.log(response);
      if (
        response.razorpay_payment_id &&
        response.razorpay_order_id &&
        response.razorpay_signature
      ) {
        const info = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        setRazorPayInfo({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
        });
        const result = await axios.post(paymentVerify, info);
        console.log("result", result);
        if (result?.status === 200) {
          completeOrder();
          toast.success("Payment Completed");
        }
      }
    } catch (e) {
      console.log(e);
      throw Error(`Payment Verification failed`);
    }
  };

  const completeOrder = () => {
    const date = new Date();
    const info = {
      bookArray: [...user?.cart?.contents],
      paymentMode: "Online",
      trackingID: crypto.randomUUID(),
      address: JSON.stringify(addressSelected),
      subTotal: orderCost,
      deliveryCharge: deliveryFee,
      totalAmount: Number(orderCost) + Number(deliveryFee),
      rentedOn: new Date(),
      returnDate: new Date(date.setDate(date.getDate() + 30)),
      razorpayOrderId: razorpayInfo?.razorpayOrderId,
      razorpayPaymentId: razorpayInfo?.razorpayPaymentId,
    };
    console.log("info", info);
    setCompleteOrderLoader(true);
    axios
      .post(completeOrderUrl, info)
      .then((res) => {
        console.log("complete", res);
        if (res?.status === 200) {
          setCompleteOrderLoader(false);
          deleteAllItemsFromCart();
          toast.success("Order placed successfully");
          navigate(`/rentDetail/${res?.data?._id}`);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setCompleteOrderLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Updation of order details failed after payment`);
      });
  };

  return (
    <Wrapper>
      <PageTitle>Check Out</PageTitle>
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} md={6}>
          <OrderSummary />
        </Grid>
        <Grid item xs={12} md={6}>
          <DeliveryAddress
            addressSelected={addressSelected}
            setAddressSelected={setAddressSelected}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DeliveryFee
            deliveryFee={deliveryFee}
            setDeliveryFee={setDeliveryFee}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PriceSummary deliveryFee={deliveryFee} orderCost={orderCost} />
        </Grid>
      </Grid>
      <Stack mt={4} justifyContent="center" alignItems="center">
        <PrimaryButton
          onClick={() => makePayment(Number(orderCost) + Number(deliveryFee))}
          disabled={!addressSelected || user?.cart?.contents.length === 0}
        >
          {paymentLoader || completeOrderLoader || deleteAllLoader ? (
            <Spinner />
          ) : (
            "Make Payment"
          )}
        </PrimaryButton>
        {/* <PrimaryButton onClick={() => completeOrder()}>
          Make Payment
        </PrimaryButton> */}
      </Stack>
    </Wrapper>
  );
};

export default Checkout;
