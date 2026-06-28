import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useEffect, useLayoutEffect } from "react";
import axios from "axios";

import "./index.css";
import "./App.css";
import Header from "./shared/components/header/Header";
import Footer from "./shared/components/footer/Footer";
import Landing from "./pages/landing/Landing";
import Profile from "./pages/profile/Profile";
import { theme } from "./shared/styles/theme";
import Home from "./pages/home/Home";
import BookDetail from "./pages/bookDetail/BookDetail";
import Checkout from "./pages/checkout/Checkout";
import RentDetail from "./pages/rentDetail/RentDetail";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./shared/components/login/Login";
import SignUpModal from "./shared/components/signup/SignUp";
import { setLoginClose, setSignupClose } from "./logic/reducers/userSlice";
import NotFound from "./pages/notFound/NotFound";
import ProtectedRoute from "./utilities/ProtectedRoute";
import { setAddressClose } from "./logic/reducers/profileSlice";
import AddressModal from "./shared/components/addressModal/AddressModal";

const App = () => {
  // const {
  //   user: { loginOpen, signupOpen },
  // } = useSelector((state) => state);
  const { isLoggedIn, user, loginOpen, signupOpen, token } = useSelector(
    (state) => state.user
  );
  const { addressOpen } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster />
        <Header />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard" element={<Home />} />
            <Route
              path="/bookDetail/:bookId/:userId"
              element={<BookDetail />}
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/rentDetail/:rentId" element={<RentDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
        <LoginModal
          open={loginOpen}
          onClose={() => dispatch(setLoginClose())}
        />
        <SignUpModal
          open={signupOpen}
          onClose={() => dispatch(setSignupClose())}
        />
        <AddressModal
          open={addressOpen}
          onClose={() => dispatch(setAddressClose())}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
