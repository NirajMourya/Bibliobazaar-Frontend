import { Paper, styled, Typography } from "@mui/material";

export const RentDetailWrapper = styled(Paper)((({ theme }) => ({
  padding: '16px'
})))

export const TextContent = styled(Typography)((({ theme }) => ({
  flexBasis: '50%'
})))

export const TablePaper = styled(Paper)((({ theme }) => ({
  padding: '8px 16px'
})))

export const TableHeader = styled(Typography)((({ theme }) => ({
  flexBasis: '33.3%',
  textAlign: 'center',
  fontSize: theme?.fontSize?.sm,
  fontWeight: theme?.fontWeight?.xl
})))

export const ImageDiv = styled('div')((({ theme }) => ({
  flexBasis: '33.3%',
  textAlign: 'center',
  padding: '16px 8px'
})))

export const Book = styled('div')((({ theme }) => ({
  flexBasis: '33.3%',
  textAlign: 'center',
  padding: '16px 8px'
})))

export const Tracking = styled('div')((({ theme }) => ({
  flexBasis: '33.3%',
  textAlign: 'center',
  padding: '16px 8px'
})))

export const Label = styled(Typography)((({ theme }) => ({
  fontWeight: theme.fontWeight.xl
})))

export const Value = styled(Typography)((({ theme }) => ({
  
})))

export const DeliveryStatus = styled(Typography)((({ theme }) => ({
  background: theme?.primary?.main,
  padding: "8px 16px",
  fontWeight: theme?.fontWeight?.xl,
  color: theme?.palette?.black,
  borderRadius: '10px',
  width: 'fit-content'
})))

export const TrackId = styled(Typography)((({ theme }) => ({
  
})))


