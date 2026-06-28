import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { MenuItem, Stack } from "@mui/material";

import { TxtFld, PrimaryButton } from "../../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { addAddressUrl, editAddressUrl } from "../../../config/Config";
import Spinner from "../spinner/Spinner";
import { CustomSelectProfile } from "../../../pages/profile/components/account/Account.styles";
import {
  CancelButton,
  DefaultAddressLabel,
} from "../../../pages/profile/components/addresses/Addresses.styles";
import {
  setAddressClose,
  setEditAddress,
} from "../../../logic/reducers/profileSlice";
import { statesList } from "./data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  height: "auto",
  overflow: "auto",
};

const validationSchema = yup.object({
  fullName: yup.string("Enter your name").required("Name is required"),
  mobileNumber: yup
    .number("Enter phone number")
    .min(1000000000, "Enter valid mobile number")
    .max(9999999999, "Enter valid mobile number")
    .required("Phone number is required"),
  pincode: yup
    .number("Enter Pincode")
    .min(100000, "Enter valid pin code")
    .max(999999, "Enter valid pin code")
    .required("Pincode is required"),
  houseNumber: yup
    .string("Enter house number")
    .required("House number is required"),
  area: yup.string("Enter your are").required("Area is required"),
  city: yup.string("Enter your city").required("City is required"),
  state: yup.string("Enter your state").required("State is required"),
});
export default function AddressModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editAddress } = useSelector((state) => state.profile);
  const [formValues, setFormValues] = useState({
    fullName: "",
    mobileNumber: "",
    houseNumber: "",
    area: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "Andhra Pradesh",
    addressType: "Other",
    isDefault: false,
  });

  const [loader, setLoader] = useState(false);
  const [addressLoader, setAddressLoader] = useState(false);

  const resetFormManually = () => {
    setFormValues({
      fullName: "",
      mobileNumber: "",
      houseNumber: "",
      area: "",
      landmark: "",
      city: "",
      pincode: "",
      state: "Andhra Pradesh",
      addressType: "Other",
      isDefault: false,
    });
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      addAddressFn(values);
    },
  });

  useEffect(() => {
    console.log("editAddressModal", editAddress);
    if (Object.keys(editAddress).length > 0) {
      setFormValues(editAddress);
    }
  }, [editAddress]);

  const addAddressFn = (values) => {
    console.log("values", values);
    const info = {
      ...values,
    };
    setAddressLoader(true);
    axios
      .post(
        Object.keys(editAddress).length > 0 ? editAddressUrl : addAddressUrl,
        info
      )
      .then((res) => {
        if (res?.status === 200) {
          setAddressLoader(false);
          formik.resetForm();
          resetFormManually();
          dispatch(setAddressClose());
          dispatch(setEditAddress({}));
          toast.success(
            Object.keys(editAddress).length > 0
              ? "Edited Address successfully"
              : "Added address successfully"
          );
        }
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(setEditAddress({}));
        setAddressLoader(false);
        toast.error(err?.message || "Something is wrong");
        formik.resetForm();
        resetFormManually();
        throw Error(`Add / Edit of address failed`);
      });
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add your Address
          <IconButton
            aria-label="close"
            onClick={() => {
              props.onClose();
              formik.resetForm();
              resetFormManually();
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack flexDirection="row" gap="8px">
            <TxtFld
              id="fullName"
              label="Full Name"
              variant="outlined"
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              value={formik.values.fullName}
            />
            <TxtFld
              id="mobileNumber"
              type="number"
              label="Mobile Number"
              variant="outlined"
              onChange={formik.handleChange}
              error={
                formik.touched.mobileNumber &&
                Boolean(formik.errors.mobileNumber)
              }
              helperText={
                formik.touched.mobileNumber && formik.errors.mobileNumber
              }
              value={formik.values.mobileNumber}
            />
          </Stack>
          <Stack flexDirection="row" gap="8px">
            <TxtFld
              id="houseNumber"
              label="Flat, House no., Building, Apartment"
              variant="outlined"
              onChange={formik.handleChange}
              error={
                formik.touched.houseNumber && Boolean(formik.errors.houseNumber)
              }
              helperText={
                formik.touched.houseNumber && formik.errors.houseNumber
              }
              value={formik.values.houseNumber}
            />
            <TxtFld
              id="area"
              label="Area, Street, Sector, Village"
              variant="outlined"
              onChange={formik.handleChange}
              error={formik.touched.area && Boolean(formik.errors.area)}
              helperText={formik.touched.area && formik.errors.area}
              value={formik.values.area}
            />
          </Stack>
          <Stack flexDirection="row" gap="8px">
            <TxtFld
              id="landmark"
              label="Landmark (Optional)"
              variant="outlined"
              onChange={formik.handleChange}
              error={formik.touched.landmark && Boolean(formik.errors.landmark)}
              helperText={formik.touched.landmark && formik.errors.landmark}
              value={formik.values.landmark}
            />
            <TxtFld
              id="city"
              label="Town/City*"
              variant="outlined"
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              value={formik.values.city}
            />
          </Stack>
          <Stack flexDirection="row" gap="8px">
            <TxtFld
              id="pincode"
              label="Pin Code"
              variant="outlined"
              onChange={formik.handleChange}
              error={formik.touched.pincode && Boolean(formik.errors.pincode)}
              helperText={formik.touched.pincode && formik.errors.pincode}
              value={formik.values.pincode}
            />
            <CustomSelectProfile
              id="state"
              name="state"
              onChange={formik.handleChange}
              value={formik?.values?.state}
            >
              {statesList?.map((state) => (
                <MenuItem value={state} key={state}>
                  {state}
                </MenuItem>
              ))}
            </CustomSelectProfile>
          </Stack>
          <Stack flexDirection="row" gap="8px">
            <CustomSelectProfile
              id="addressType"
              name="addressType"
              onChange={formik.handleChange}
              value={formik?.values?.addressType}
              style={{ width: "50%" }}
            >
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </CustomSelectProfile>
            <Stack
              mt={2}
              flexDirection={"row"}
              gap={"4px"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <input
                type="checkbox"
                name="isDefault"
                id="isDefault"
                onChange={formik.handleChange}
                value={formik?.values?.isDefault}
              />
              <DefaultAddressLabel>
                Make this my default address
              </DefaultAddressLabel>
            </Stack>
          </Stack>
          <Stack mt={2} flexDirection="row" gap="8px" justifyContent={"center"}>
            <CancelButton
              sx={{ width: "40%" }}
              onClick={() => {
                formik.resetForm();
                resetFormManually();
                dispatch(setAddressClose());
                dispatch(setEditAddress({}));
              }}
            >
              Cancel
            </CancelButton>
            <PrimaryButton sx={{ width: "40%" }} type="submit">
              {
                addressLoader ? <Spinner /> : "Save"
                // Object.keys(editAddress).length > 0 ? (
                //   "Edit Address"
                // ) : (
                //   "Add Address"
                // )
              }
            </PrimaryButton>
          </Stack>
          {/* <input type="submit" /> */}
        </form>
      </Box>
    </Modal>
  );
}
