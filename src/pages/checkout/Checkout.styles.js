import { Paper, styled, Typography } from "@mui/material";

export const CustomPaper = styled(Paper)((({ theme }) => ({
  borderRadius: '10px',
  padding: '16px',
})))

export const CustomTitle = styled(Typography)((({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  fontWeight: theme?.fontWeight?.xl,
  fontSize: theme?.fontSize?.md
})))

export const CustomSubPaper = styled(Paper)((({ theme }) => ({
  margin: '16px 32px',
  borderRadius: '10px',
  padding: '16px 96px',
})))

export const TextItem = styled(Typography)((({ theme }) => ({

})))

export const DeliveryAddressWrapper = styled('div')((({ theme }) => ({
  padding: '16px 8px',
  height: '400px',
  overflow: 'auto'
})))

export const OrderSummaryWrapper = styled('div')((({ theme }) => ({
  padding: '16px 32px',
  height: '400px',
  overflow: 'auto'
})))

export const TextContent = styled(Typography)((({ theme }) => ({
  flexBasis: '20%'
})))

export const TextContent2 = styled(Typography)((({ theme }) => ({
  flexBasis: '30%'
})))

export const TextContent3 = styled(Typography)((({ theme }) => ({
  flexBasis: '10%'
})))

export const Image = styled('div')((({ theme }) => ({
  flexBasis: '20%'
})))

export const Description = styled('div')((({ theme }) => ({
  flexBasis: '30%'
})))

export const Quantity = styled('div')((({ theme }) => ({
  flexBasis: '20%'
})))

export const Price = styled('div')((({ theme }) => ({
  flexBasis: '20%'
})))

export const Delete = styled('div')((({ theme }) => ({
  flexBasis: '10%',
  color: theme?.palette?.danger,
  cursor: 'pointer'
})))

export const NoData = styled(Typography)((({ theme }) => ({
  textAlign: 'center',
  paddingTop: '32px'
})))