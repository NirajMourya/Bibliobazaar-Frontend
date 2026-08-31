import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { AppBar, Avatar, Badge, Typography } from '@mui/material';

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  color: theme?.palette?.black,
  backgroundColor: theme?.palette?.background?.paper,
  borderBottom: `1px solid ${theme?.palette?.divider}`,
  padding: '0px 24px'
}));

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey,
  width: '100%',
  transition: 'background-color 0.2s ease',
  '&:focus-within': {
    backgroundColor: theme.palette.borderGrey,
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0.75)})`,
    paddingRight: '64px',
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export const SearchIconWrapperRight = styled('span')(({ theme }) => ({
  padding: '8px',
  position: 'absolute',
  top: 0,
  right: '4px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

export const ClearIconWrapper = styled('span')(({ theme }) => ({
  padding: '8px',
  position: 'absolute',
  top: 0,
  right: '36px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: theme?.palette?.text?.secondary,
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme?.primary?.main
  }
}));

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme?.palette?.borderGrey,
  cursor: 'pointer',
  width: '35px',
  height: '35px'
}))

export const UserName = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: '8px',
  cursor: 'pointer',
  fontSize: theme?.fontSize?.xs,
}))

export const AuthButton = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  fontSize: theme?.fontSize?.md,
  fontWeight: theme?.fontWeight?.lg,
  '&:hover': {
    color: theme?.primary?.main
  }
}))