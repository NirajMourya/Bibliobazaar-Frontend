import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";

const BookCard = () => {
  const navigate = useNavigate();

  return (
    <CustomCard>
      <CardContent>
        <Stack
          direction="row"
          className="StackTitle"
          justifyContent="space-between"
        >
          <Stack>
            <BookTitle>Harry Potter and the philosopher’s stone</BookTitle>
            <BookInfo>J. K. Rowling</BookInfo>
            <BookInfo>ISBN - 1234567891231</BookInfo>
            <TableContainer component={Paper}>
              <Table>
                <TableRow>
                  <TableCell variant="head">Rent Expected</TableCell>
                  <TableCell>Rs. 70</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Quantity</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">On Rent</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Available</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Stack>
          <Stack>
            <CardImage
              component="img"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm33lv0W92j2lTEfjP-AkuRKY1z7vPlKfYbQ&usqp=CAU"
              alt=""
              width={140}
              height={140}
            />
            <Stack direction="row" justifyContent="flex-end">
              <EditButton variant="outlined">Edit</EditButton>
              <RemoveButton variant="outlined">Remove</RemoveButton>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </CustomCard>
  );
};

export default BookCard;

const CustomCard = styled(Card)(() => ({
  borderRadius: "10px",
}));

const CardImage = styled(CardMedia)(() => ({
  objectFit: "contain",
  borderRadius: "10px",
}));

const BookTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.sm,
  fontWeight: theme?.fontWeight?.xl,
}));

const BookInfo = styled(Typography)(({ theme }) => ({
  fontSize: theme?.fontSize?.xs,
}));

const EditButton = styled(Button)(() => ({
  background: "#FFF4CD",
  borderRadius: "8px",
  color: "#DD9200",
  border: "solid 1px #DD9200",
  margin: "10px",
}));

const RemoveButton = styled(Button)(() => ({
  background: "#FFD5D8",
  borderRadius: "8px",
  color: "#CC0000",
  border: "solid 1px #CC0000",
  margin: "10px",
}));
