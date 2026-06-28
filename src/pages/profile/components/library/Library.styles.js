import { Button, styled, Paper, Typography,InputBase,CardMedia } from "@mui/material";

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(3),
    marginTop: '12px',
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

export const LibraryPaper = styled(Paper)(({ theme }) => ({
  padding: "16px 32px",
  marginBottom: "16px"
}));

export const CardImage = styled(CardMedia)(() => ({
  objectFit: "contain",
  borderRadius:"10px"
}));

export const BookTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.xs,
  fontWeight: theme?.fontWeight?.xl,
}));

export const BookInfo = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.vs,
}));

export const BookData = styled(Typography)(({ theme }) => ({
  
}));

export const BookButton = styled(Button)((({ theme, type }) => ({
  padding: '4px 12px',
  borderRadius: '10px',
  textTransform: 'none',
  background: type === 'remove' ? theme?.palette?.removeBg: theme?.palette?.editBg,
  color: type === 'remove' ? theme?.palette?.removeColor: theme?.palette?.editColor,
  '&:hover': {
    transform: 'scale(1.05)',
    background: type === 'remove' ? theme?.palette?.removeBg: theme?.palette?.editBg,
  },
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.6
  },
})))

export const CancelButton = styled(Button)((({ theme, type }) => ({
  padding: '8px',
  borderRadius: '10px',
  textTransform: 'none',
  border: `1px solid ${theme?.palette?.borderGrey}`,
  background: theme?.palette?.white,
  color: theme?.palette?.black,
  '&:hover': {
    transform: 'scale(1.05)',
    background: theme?.palette?.white,
  },
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.6
  },
})))

export const NoBookContent = styled(Typography)((({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100px'
})))

export const SearchIconWrapperRight = styled('span')(({ theme }) => ({
  padding: '8px',
  position: 'absolute',
  right: '4px',
  cursor: 'pointer',
}));