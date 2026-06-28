import { Box, Card, Paper, styled, Typography } from "@mui/material";

export const DescriptionPaper = styled(Paper)(() => ({
  borderRadius: "10px",
  padding: "32px"
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.lg
}));

export const Author = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.md
}));

export const Description = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.sm
}));

export const Isbn = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.md
}));

export const BuyContainer = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  padding: "32px"
}));

export const HeadingDiv = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  paddingBottom: '12px',
  borderBottom: `1px solid ${theme?.palette?.lightGrey}`
}));

export const Heading = styled(Typography)(({ theme }) => ({
  fontSize: theme.fontSize?.lg,
  fontWeight: theme.fontWeight?.xl,
}));

export const SubText = styled(Typography)(({ theme }) => ({
  fontSize: theme.fontSize?.md,
}));

export const ReadMoreText = styled(Typography)(({ theme }) => ({
  textDecoration: 'underline',
  color: theme?.primary?.main,
  fontSize: theme?.fontSize?.xxs,
  cursor: 'pointer'
}));