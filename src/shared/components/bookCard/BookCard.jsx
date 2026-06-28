import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack, styled } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setLoginOpen } from "../../../logic/reducers/userSlice";

const BookCard = (props) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const {
    data: { userId, rentExpected, bookId, bookName, author, imageUrl },
  } = props;
  const navigate = useNavigate();

  return (
    <>
      <CustomCard
        onClick={() => {
          if (isLoggedIn) {
            navigate(`/bookDetail/${bookId}/${userId}`);
          } else {
            toast.error("Please Login to view details");
            dispatch(setLoginOpen());
          }
        }}
      >
        <CardActionArea>
          <CardImage
            component="img"
            image={imageUrl}
            alt=""
            width={300}
            height={300}
          />
          <CardContent>
            <Stack
              direction="column"
              alignItems="flexStart"
              spacing={0.5}
              mt={0.5}
            >
              <BookAuthor>{author.join(",")}</BookAuthor>
              <BookTitle id={bookName}>{bookName}</BookTitle>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={0.5}
                mt={0.5}
              >
                <BookInfo>Price</BookInfo>
                <BookInfo>Rs. {rentExpected}</BookInfo>
              </Stack>
            </Stack>
            {/* <Stack mt={1} justifyContent="center" alignItems="center">
            <PrimaryButton>Check Out</PrimaryButton>
          </Stack> */}
            {/* <CircularProgress color="inherit" /> */}
          </CardContent>
        </CardActionArea>
      </CustomCard>
    </>
  );
};

export default BookCard;

const CustomCard = styled(Card)(() => ({
  borderRadius: "10px",
  // width: "auto",
  // minWidth: "300px",
}));

const CardImage = styled(CardMedia)(() => ({
  // minWidth: "300px",
  // minHeight: "300px",
  // width: '100%',
  // height: 'auto',
  objectFit: "contain",
}));

const BookAuthor = styled(Typography)(() => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const BookTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.md,
  fontWeight: theme?.fontWeight?.xl,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const BookInfo = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.md,
}));
