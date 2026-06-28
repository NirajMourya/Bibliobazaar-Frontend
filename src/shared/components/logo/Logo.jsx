import { styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const LogoTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Nunito",
  cursor: "pointer",
  fontWeight: theme?.fontWeight?.xxl,
  fontSize: theme?.fontSize?.xl,
  color: theme?.palette?.logo,
}));

const Logo = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <LogoTypography
      onClick={() => (isLoggedIn ? navigate("/dashboard") : navigate("/"))}
    >
      BiblioBazaar
    </LogoTypography>
  );
};

export default Logo;
