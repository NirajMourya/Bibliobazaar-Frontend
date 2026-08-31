import { Box, Grid, Stack, Typography } from "@mui/material";

import Logo from "../logo/Logo";
import {
  CopyrightContainer,
  CustomFooter,
  LogoContainer,
  SocialContainer,
} from "./Footer.styles";
import twitter from "../../../../src/assets/icons/twitter.svg";
import facebook from "../../../../src/assets/icons/facebook.svg";

const Footer = () => {
  return (
    <CustomFooter>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <SocialContainer>
            <Stack flexDirection="row" gap="20px" alignItems={"center"}>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <img src={facebook} alt="Facebook" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <img src={twitter} alt="Twitter" />
              </a>
            </Stack>
            <Box>
              <Typography>About Us</Typography>
              <Typography>Terms & Conditions</Typography>
            </Box>
          </SocialContainer>
        </Grid>
        <Grid item xs={12} sm={4}>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CopyrightContainer>
            <Typography>© {new Date().getFullYear()} BiblioBazaar</Typography>
            <Typography>All rights reserved</Typography>
          </CopyrightContainer>
        </Grid>
      </Grid>
    </CustomFooter>
  );
};

export default Footer;
