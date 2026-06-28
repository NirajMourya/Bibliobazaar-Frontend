import { Button, styled, Paper, Typography,InputBase,CardMedia } from "@mui/material";

export const NoRecordContent = styled(Typography)((({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100px'
  })))

  export const LibraryPaper = styled(Paper)(({ theme }) => ({
    padding: "16px 32px"
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

  export const NavItemDiv = styled(Typography)(({ active, theme }) => ({
    fontWeight: `${active ? theme?.fontWeight?.xl: ''}`,
    cursor: 'pointer',
    padding:"5px"
  }));