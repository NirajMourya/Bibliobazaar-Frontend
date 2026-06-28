import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "../../shared/styles/globalStyles";
import Account from "./components/account/Account";
import Addresses from "./components/addresses/Addresses";
import LeftNav from "./components/leftNav/LeftNav";
import Library from "./components/library/Library";
import RentHistory from "./components/rentHistory/RentHistory";
import { LeftGrid, RightGrid } from "./Profile.styles";

const Profile = () => {
  // const [active, setActive] = useState("account");
  const { activeTab } = useSelector((state) => state.profile);

  const renderTab = () => {
    switch (activeTab) {
      case "account":
        return <Account />;
      case "addresses":
        return <Addresses />;
      case "library":
        return <Library />;
      case "rentHistory":
        return <RentHistory />;
    }
  };

  return (
    <Wrapper>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={2}>
          <LeftGrid>
            <LeftNav />
          </LeftGrid>
        </Grid>
        <Grid item xs={12} sm={10}>
          <RightGrid>{renderTab()}</RightGrid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Profile;
