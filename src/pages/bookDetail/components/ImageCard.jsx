import { Card, CardActionArea, CardMedia, styled } from "@mui/material";

const ImageCard = (props) => {
  const { url } = props;

  return (
    <CustomCard>
      <CardActionArea>
        {/* <CardImage
          component="img"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm33lv0W92j2lTEfjP-AkuRKY1z7vPlKfYbQ&usqp=CAU"
          alt=""
        /> */}
        <CardImage component="img" image={url} alt="" />
      </CardActionArea>
    </CustomCard>
  );
};

export default ImageCard;

const CustomCard = styled(Card)(() => ({
  borderRadius: "10px",
  width: "100%",
}));

const CardImage = styled(CardMedia)(() => ({
  objectFit: "contain",
  maxHeight: "500px",
}));
