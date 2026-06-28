import { useState } from "react";
import { useNavigate } from "react-router";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";

import {
  AuthButton,
  CustomAppBar,
  CustomAvatar,
  Search,
  SearchIconWrapper,
  SearchIconWrapperRight,
  StyledBadge,
  StyledInputBase,
  UserName,
} from "./Header.styles";
import { profileTabs } from "./data";
import Logo from "../logo/Logo";
import {
  logoutUser,
  setLoginOpen,
  setSearchTrigger,
  setSearchValue,
  setSignupOpen,
} from "../../../logic/reducers/userSlice";
import { setTab } from "../../../logic/reducers/profileSlice";

const Header = () => {
  const theme = useTheme();
  const { isLoggedIn, user, search } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (menu) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    if (menu?.key === "logout") {
      dispatch(logoutUser());
      navigate("/");
    } else if (menu?.key) {
      navigate("/profile");
      dispatch(setTab(menu?.key));
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate("/dashboard");
      dispatch(setSearchTrigger());
    }
  };

  const searchIconClick = () => {
    navigate("/dashboard");
    dispatch(setSearchTrigger());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {profileTabs?.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            handleMenuClose(item);
          }}
        >
          {item?.icon}&nbsp;{item?.label}
        </MenuItem>
      ))}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = isLoggedIn ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          user?.cart?.contents?.length > 0
            ? navigate("/checkout")
            : navigate("/dashboard");
        }}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={user?.cart?.contents?.length || 0} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <AuthButton onClick={() => dispatch(setLoginOpen())}>Login</AuthButton>
      </MenuItem>
      <MenuItem>
        <AuthButton onClick={() => dispatch(setSignupOpen())}>
          Sign Up
        </AuthButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar position="static">
        <Toolbar>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <Search sx={{ display: { xs: "none", sm: "block" } }}>
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            <StyledInputBase
              placeholder="Books / Author / ISBN"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
              onKeyDown={handleKeyDown}
            />
            <SearchIconWrapperRight>
              <SearchIcon onClick={() => searchIconClick()} />
            </SearchIconWrapperRight>
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                sx={{ mr: 3, p: 0 }}
                onClick={() => {
                  user?.cart?.contents?.length > 0
                    ? navigate("/checkout")
                    : navigate("/dashboard");
                }}
              >
                <StyledBadge
                  badgeContent={user?.cart?.contents?.length || 0}
                  color="info"
                >
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: theme?.fontSize?.xl }}
                  />
                </StyledBadge>
              </IconButton>
              <Box onClick={handleProfileMenuOpen} sx={{ display: "flex" }}>
                <CustomAvatar
                  src={user?.profilePicture}
                  aria-controls={menuId}
                  aria-haspopup="true"
                />
                <UserName>
                  {user?.firstName}
                  <KeyboardArrowDownOutlinedIcon />
                </UserName>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{ display: { xs: "none", md: "flex" }, gap: "32px", mr: 8 }}
            >
              <AuthButton onClick={() => dispatch(setLoginOpen())}>
                Login
              </AuthButton>
              <AuthButton onClick={() => dispatch(setSignupOpen())}>
                Sign Up
              </AuthButton>
            </Box>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </CustomAppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
