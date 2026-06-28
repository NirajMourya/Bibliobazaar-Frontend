import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import {
  ActionItems,
  LandingContainer,
  SubTitle,
  TextContainer,
  Title,
} from "./Landing.styles";
import LandingImage from "../../../src/assets/images/landingImage.svg";
import { OutlineButton, PrimaryButton } from "../../shared/styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { setLoginOpen, setSignupOpen } from "../../logic/reducers/userSlice";

const Landing = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <LandingContainer>
      <Grid container>
        <Grid item md={7} xs={12}>
          <TextContainer>
            <Title variant="h3">
              Ever wanted to read a book but could not because it was too
              expensive?
            </Title>
            <SubTitle variant="h6">Worry not! BiblioBazaar is here!</SubTitle>
            <ActionItems>
              <OutlineButton onClick={() => dispatch(setSignupOpen())}>
                Sign Up
              </OutlineButton>
              <PrimaryButton onClick={() => dispatch(setLoginOpen())}>
                Login
              </PrimaryButton>
            </ActionItems>
          </TextContainer>
        </Grid>
        <Grid item md={5} xs={12}>
          <img src={LandingImage} alt="" width={450} height={450} />
        </Grid>
      </Grid>
    </LandingContainer>
  );
};

export default Landing;
