import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Modal, Stack, IconButton } from "@mui/material";

import {
  PrimaryButton,
  OutlineButton,
  BoldText,
} from "../../../../shared/styles/globalStyles";
import CloseIcon from "@mui/icons-material/Close";
import {
  setDeleteBookClose,
  closeAddBookData,
} from "../../../../logic/reducers/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../../assets/icons/DeleteIcon.svg";
import axios from "axios";
import { deleteBookUrl } from "../../../../config/Config";
import { toast } from "react-hot-toast";
import Spinner from "../../../../shared/components/spinner/Spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  maxHeight: "550px",
};

export default function BookDeleteModal(props) {
  const dispatch = useDispatch();
  const { bookData } = useSelector((state) => state.book);

  const delBook = () => {
    if (!bookData) return;
    const info = {
      bookId: bookData?.bookId._id,
    };
    setLoader(true);
    axios
      .post(deleteBookUrl, info)
      .then((res) => {
        if (res?.status === 200) {
          setLoader(false);
          dispatch(closeAddBookData());
          dispatch(setDeleteBookClose());
          toast.success("Book removed successfully");
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("error", err);
        toast.error(err?.message || "Something went wrong");
        throw Error(`Deleting a book from collection failed`);
      });
  };

  const [loader, setLoader] = useState(false);
  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          flexDirection="row"
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"12px"}
        >
          <img src={DeleteIcon} alt="" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion
            <IconButton
              aria-label="close"
              onClick={() => {
                dispatch(closeAddBookData());
                dispatch(setDeleteBookClose());
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
        </Stack>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure wish to remove{" "}
          <BoldText>{bookData?.bookId?.bookName}?</BoldText>
        </Typography>
        <Stack mt={2} flexDirection="row" gap="8px" justifyContent="flex-end">
          <OutlineButton
            style={{ padding: "4px 24px" }}
            onClick={() => {
              dispatch(closeAddBookData());
              dispatch(setDeleteBookClose());
            }}
          >
            Cancel
          </OutlineButton>
          <PrimaryButton type="submit" onClick={() => delBook()}>
            {loader ? <Spinner /> : "Delete"}
          </PrimaryButton>
        </Stack>
      </Box>
    </Modal>
  );
}
