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
              <a href="https://www.facebook.com" target="_blank">
                <img src={facebook} alt="" />
              </a>
              <a href="https://www.twitter.com" target="_blank">
                <img src={twitter} alt="" />
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
            <Typography>© 2022 BiblioBazaar</Typography>
            <Typography>All rights reserved</Typography>
          </CopyrightContainer>
        </Grid>
      </Grid>
    </CustomFooter>
  );
};

export default Footer;
