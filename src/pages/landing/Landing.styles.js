import { styled, Typography } from "@mui/material";

export const LandingContainer = styled('div')((({ theme }) => ({
  height: 'auto',
  padding: '64px 64px 64px 64px',
})))

export const TextContainer = styled('div')((({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
})))

export const Title = styled(Typography)((({ theme }) => ({
  
})))

export const SubTitle = styled(Typography)((({ theme }) => ({
  
})))

export const ActionItems = styled('div')((({ theme }) => ({
  display: 'flex',
  gap: '24px'
})))