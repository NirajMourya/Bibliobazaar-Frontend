import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import {
  PrimaryButton2,
  TxtFld,
  PrimaryText,
  DangerText,
} from "../../styles/globalStyles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  loginUser,
  setLoginClose,
  setSignupOpen,
} from "../../../logic/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginUrl } from "../../../config/Config";
import Spinner from "../spinner/Spinner";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
export default function LoginModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      login(values);
    },
  });

  const login = (values) => {
    const { email, password } = values;
    const info = {
      emailId: email,
      password: password,
    };
    setLoader(true);
    axios
      .post(loginUrl, info)
      .then((res) => {
        if (res?.status === 200) {
          setLoader(false);
          dispatch(loginUser(res?.data));
          dispatch(setLoginClose());
          navigate("/dashboard");
          formik.resetForm();
        }
      })
      .catch((err) => {
        console.log("error", err);
        setLoader(false);
        //toast.error(err?.message || "Something is wrong");
        toast.error(err?.response?.data?.message || "Something is wrong", {
          duration: 4000,
        });
        //formik.resetForm()
        throw Error(`Login failed with email id: ${info?.emailId}`);
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
          Log In
          <IconButton
            aria-label="close"
            onClick={() => {
              props.onClose();
              formik.resetForm();
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
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Welcome back! Please enter your details
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TxtFld
            id="email"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            value={formik.values.email}
          />
          <TxtFld
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            value={formik.values.password}
          />
          <PrimaryButton2
            // disabled={!formik.hasChanged || formik.hasErrors || formik.isSubmitting}
            type="submit"
          >
            {loader ? <Spinner /> : "Log In"}
          </PrimaryButton2>
        </form>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Don't have a account?{" "}
          <PrimaryText
            onClick={() => {
              dispatch(setLoginClose());
              dispatch(setSignupOpen());
              formik.resetForm();
            }}
            sx={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Sign Up
          </PrimaryText>
        </Typography>
      </Box>
    </Modal>
  );
}
