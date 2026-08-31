import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { toggleThemeMode } from "../../../logic/reducers/uiSlice";

import {
  AuthButton,
  CustomAppBar,
  CustomAvatar,
  Search,
  SearchIconWrapperRight,
  ClearIconWrapper,
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
  const { mode } = useSelector((state) => state.ui);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Auto search-as-you-type while already on the results page, debounced
  useEffect(() => {
    if (location.pathname !== "/dashboard") return;
    const timeout = setTimeout(() => {
      dispatch(setSearchTrigger());
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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

  const clearSearch = () => {
    dispatch(setSearchValue(""));
    dispatch(setSearchTrigger());
  };

  // Search isn't useful mid-checkout, but should stay visible on landing so
  // users can browse books before signing in
  const hideSearchRoutes = ["/checkout"];
  const showSearch = !hideSearchRoutes.includes(location.pathname);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
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
      disableScrollLock
      transitionDuration={{ enter: 220, exit: 160 }}
      slotProps={{
        paper: {
          elevation: 3,
          sx: { mt: 1.5, minWidth: 180, borderRadius: "12px" },
        },
      }}
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
        vertical: "bottom",
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
      disableScrollLock
      transitionDuration={{ enter: 220, exit: 160 }}
      slotProps={{
        paper: {
          elevation: 3,
          sx: { mt: 1.5, minWidth: 180, borderRadius: "12px" },
        },
      }}
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
          <StyledBadge badgeContent={user?.cart?.contents?.length || 0}>
            <ShoppingCartOutlinedIcon />
          </StyledBadge>
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
        vertical: "bottom",
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
      disableScrollLock
      transitionDuration={{ enter: 220, exit: 160 }}
      slotProps={{
        paper: {
          elevation: 3,
          sx: { mt: 1.5, minWidth: 180, borderRadius: "12px" },
        },
      }}
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
        <Toolbar sx={{ gap: 2, justifyContent: "space-between" }}>
          <Logo />
          {showSearch ? (
            <Search sx={{ display: { xs: "none", sm: "flex" }, flex: 1, maxWidth: 480 }}>
              <StyledInputBase
                placeholder="Books / Author / ISBN"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                onKeyDown={handleKeyDown}
              />
              {search ? (
                <ClearIconWrapper aria-label="clear search" onClick={clearSearch}>
                  <ClearIcon fontSize="small" />
                </ClearIconWrapper>
              ) : null}
              <SearchIconWrapperRight>
                <SearchIcon onClick={() => searchIconClick()} />
              </SearchIconWrapperRight>
            </Search>
          ) : (
            <Box sx={{ flex: 1 }} />
          )}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              aria-label="toggle dark mode"
              color="inherit"
              onClick={() => dispatch(toggleThemeMode())}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {isLoggedIn ? (
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <IconButton
                  size="large"
                  aria-label="cart"
                  color="inherit"
                  sx={{ p: 0 }}
                  onClick={() => {
                    user?.cart?.contents?.length > 0
                      ? navigate("/checkout")
                      : navigate("/dashboard");
                  }}
                >
                  <StyledBadge
                    badgeContent={user?.cart?.contents?.length || 0}
                  >
                    <ShoppingCartOutlinedIcon
                      sx={{ fontSize: theme?.fontSize?.xl }}
                    />
                  </StyledBadge>
                </IconButton>
                <Box onClick={handleProfileMenuOpen} sx={{ display: "flex", cursor: "pointer" }}>
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
              </Stack>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                spacing={4}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <AuthButton onClick={() => dispatch(setLoginOpen())}>
                  Login
                </AuthButton>
                <AuthButton onClick={() => dispatch(setSignupOpen())}>
                  Sign Up
                </AuthButton>
              </Stack>
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
          </Stack>
        </Toolbar>
      </CustomAppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
