import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Container, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy, useEffect, useLayoutEffect, useMemo } from "react";
import axios from "axios";

import "./index.css";
import "./App.css";
import Header from "./shared/components/header/Header";
import Footer from "./shared/components/footer/Footer";
import { getTheme } from "./shared/styles/theme";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./shared/components/login/Login";
import SignUpModal from "./shared/components/signup/SignUp";
import { setLoginClose, setSignupClose } from "./logic/reducers/userSlice";
import ProtectedRoute from "./utilities/ProtectedRoute";
import { setAddressClose } from "./logic/reducers/profileSlice";
import AddressModal from "./shared/components/addressModal/AddressModal";
import PageLoader from "./shared/components/pageLoader/PageLoader";

const Landing = lazy(() => import("./pages/landing/Landing"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Home = lazy(() => import("./pages/home/Home"));
const BookDetail = lazy(() => import("./pages/bookDetail/BookDetail"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const RentDetail = lazy(() => import("./pages/rentDetail/RentDetail"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));

const App = () => {
  // const {
  //   user: { loginOpen, signupOpen },
  // } = useSelector((state) => state);
  const { isLoggedIn, user, loginOpen, signupOpen, token } = useSelector(
    (state) => state.user
  );
  const { addressOpen } = useSelector((state) => state.profile);
  const { mode } = useSelector((state) => state.ui);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Toaster />
        <Header />
        <Container maxWidth="xl">
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
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
