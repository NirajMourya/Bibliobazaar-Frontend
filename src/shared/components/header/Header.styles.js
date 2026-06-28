import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { AppBar, Avatar, Badge, Typography } from '@mui/material';

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  color: theme?.palette?.black,
  backgroundColor: theme?.palette?.white,
  padding: '0px 24px'
}));

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0.75)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '450px',
    },
  },
}));

export const SearchIconWrapperRight = styled('span')(({ theme }) => ({
  padding: '8px',
  position: 'absolute',
  right: '4px',
  cursor: 'pointer',
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme?.primary
  }
}));

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'grey',
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