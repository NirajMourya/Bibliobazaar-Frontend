import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { Stack, styled } from "@mui/material";

// Mirrors BookCard's layout so the loading state doesn't jump around
const BookCardSkeleton = () => {
  return (
    <CustomCard>
      <Skeleton variant="rectangular" width="100%" height={220} />
      <CardContent>
        <Stack direction="column" spacing={0.5} mt={0.5}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="70%" height={28} />
          <Stack direction="row" justifyContent="space-between" mt={0.5}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="20%" />
          </Stack>
        </Stack>
      </CardContent>
    </CustomCard>
  );
};

export default BookCardSkeleton;

const CustomCard = styled(Card)(() => ({
  borderRadius: "16px",
}));
