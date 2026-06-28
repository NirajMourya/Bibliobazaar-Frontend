import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../../../logic/reducers/profileSlice";

import { navProfileTabs } from "./data";
import { NavItemDiv } from "./LeftNav.styles";

const LeftNav = (props) => {
  // const { active, setActive } = props;
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.profile);

  return (
    <Box p={4}>
      <Stack direction="column" alignItems="flex-start" spacing={1}>
        {navProfileTabs?.map((item, i) => (
          <NavItem
            data={item}
            key={item?.key}
            active={activeTab}
            onClick={() => dispatch(setTab(item?.key))}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default LeftNav;

const NavItem = (props) => {
  const {
    data: { label, key, icon },
    active,
    onClick,
  } = props;
  return (
    <NavItemDiv active={active === key} onClick={onClick}>
      <Stack flexDirection={"row"} gap={"4px"}>
        <img src={icon} alt="" />
        {label}
      </Stack>
    </NavItemDiv>
  );
};
