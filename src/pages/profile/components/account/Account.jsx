import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Skeleton, Stack } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  DangerText,
  PrimaryButton,
  Wrapper,
} from "../../../../shared/styles/globalStyles";
import {
  BootstrapInput,
  CustomDate,
  CustomSelect,
  InputLabelText,
  InputWrapper,
  ProfileDummyImage,
  ProfileImage,
  ProfileImageContainer,
} from "./Account.styles";
import {
  accountUrl,
  fileUploadUrl,
  updateAccountUrl,
  updateProfilePicture,
} from "../../../../config/Config";
import Spinner from "../../../../shared/components/spinner/Spinner";
import ProfileImg from "../../../../assets/images/profile.png";
import { loginUser, updateCart } from "../../../../logic/reducers/userSlice";
import { useDispatch } from "react-redux";

const Account = () => {
  const dispatch = useDispatch();

  let inputRef;
  const [loader, setLoader] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    firstName: null,
    lastName: null,
    emailId: null,
    phoneNumber: null,
    gender: "select",
    dob: null,
    profilePicture: null,
  });
  const [updateLoader, setUpdateLoader] = useState(false);
  const [fileUploadLoader, setFileUploadLoader] = useState(false);

  useEffect(() => {
    accountData();
  }, []);

  const accountData = () => {
    setLoader(true);
    axios
      .get(accountUrl)
      .then((res) => {
        if (res?.status === 200) {
          setAccountInfo({
            firstName: res?.data?.firstName || null,
            lastName: res?.data?.lastName || null,
            emailId: res?.data?.emailId || null,
            phoneNumber: res?.data?.phoneNumber || null,
            gender: res?.data?.gender || "select",
            dob: res?.data?.dob || null,
            profilePicture: res?.data?.profilePicture || null,
          });
          setLoader(false);
          dispatch(updateCart(res?.data));
        }
      })
      .catch((err) => {
        console.log("error", err);
        setLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Fetching of account details failed`);
      });
  };

  const updateAccount = () => {
    if (
      accountInfo?.phoneNumber !== null &&
      accountInfo?.phoneNumber !== "" &&
      (accountInfo?.phoneNumber > 9999999999 ||
        accountInfo?.phoneNumber < 1000000000)
    ) {
      toast.error("Please enter valid mobile number");
      return;
    }
    const info = {
      firstName: accountInfo?.firstName,
      lastName: accountInfo.lastName ? accountInfo.lastName : undefined,
      phoneNumber: accountInfo.phoneNumber
        ? accountInfo.phoneNumber
        : undefined,
      gender: accountInfo.gender !== "select" ? accountInfo.gender : undefined,
      dob: accountInfo.dob ? accountInfo.dob : undefined,
    };
    // if(accountInfo.gender !== "select")
    // {
    //    info.gender = accountInfo.gender
    // }
    // else
    // {
    //   info.gender = undefined
    // }
    console.log(info);
    axios
      .post(updateAccountUrl, info)
      .then((res) => {
        setUpdateLoader(true);
        if (res?.status === 200) {
          setUpdateLoader(false);
          accountData();
          toast.success(res?.message || "Account Updated");
        }
      })
      .catch((err) => {
        console.log("error", err);
        setUpdateLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Updation of account details failed`);
      });
  };

  const handleProfileFileChange = (e) => {
    const file = e?.target?.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(fileUploadUrl, formData, config)
      .then((res) => {
        setFileUploadLoader(true);
        if (res?.status === 200) {
          setFileUploadLoader(false);
          updateProfilePic(res?.data?.url);
          // accountData();
          toast.success(res?.message || "File Uploaded");
          throw Error(`Upload of profile picture failed`);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setFileUploadLoader(false);
        toast.error(err?.message || "Something is wrong");
      });
  };

  const updateProfilePic = (url) => {
    const info = {
      profilePicture: url,
    };
    axios
      .post(updateProfilePicture, info)
      .then((res) => {
        setFileUploadLoader(true);
        if (res?.status === 200) {
          setFileUploadLoader(false);
          accountData();
          toast.success(res?.message || "Profile picture updated successfully");
        }
      })
      .catch((err) => {
        console.log("error", err);
        setFileUploadLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Updation of profile pic url failed`);
      });
  };

  return (
    <Wrapper>
      {loader ? (
        <Skeleton variant={"rectangular"} width={"100%"} height={400} />
      ) : (
        <>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={2}>
              <Stack direction="column" alignItems="center" spacing={2}>
                <ProfileImageContainer>
                  {/* <ProfileImage
                alt="profile"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm33lv0W92j2lTEfjP-AkuRKY1z7vPlKfYbQ&usqp=CAU"
              /> */}
                  {accountInfo?.profilePicture ? (
                    <ProfileImage
                      alt="profile"
                      src={accountInfo?.profilePicture}
                    />
                  ) : (
                    <ProfileDummyImage />
                  )}
                </ProfileImageContainer>
                <input
                  type="file"
                  hidden={true}
                  ref={(refParam) => (inputRef = refParam)}
                  onChange={(e) => handleProfileFileChange(e)}
                />
                <PrimaryButton
                  padding="8px 20px"
                  onClick={() => inputRef.click()}
                >
                  {fileUploadLoader ? <Spinner /> : "Change Picture"}
                </PrimaryButton>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Stack direction="column" alignItems="center" spacing={3}>
                <InputWrapper variant="standard">
                  <InputLabel shrink htmlFor="firstName">
                    <InputLabelText>
                      First Name&nbsp;<DangerText>*</DangerText>
                    </InputLabelText>
                  </InputLabel>
                  <BootstrapInput
                    defaultValue=""
                    id="firstName"
                    value={accountInfo?.firstName}
                    onChange={(e) => {
                      setAccountInfo({
                        ...accountInfo,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </InputWrapper>
                <InputWrapper variant="standard">
                  <InputLabel shrink htmlFor="emailId">
                    <InputLabelText>Email ID</InputLabelText>
                  </InputLabel>
                  <BootstrapInput
                    defaultValue=""
                    id="emailId"
                    value={accountInfo?.emailId}
                    disabled
                  />
                </InputWrapper>
                <InputWrapper variant="standard">
                  <InputLabel shrink htmlFor="gender">
                    <InputLabelText>Gender</InputLabelText>
                  </InputLabel>
                  <CustomSelect
                    id="gender"
                    value={accountInfo?.gender}
                    onChange={(e) => {
                      setAccountInfo({
                        ...accountInfo,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="select">--Select--</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </CustomSelect>
                </InputWrapper>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Stack direction="column" alignItems="center" spacing={3}>
                <InputWrapper variant="standard">
                  <InputLabel shrink htmlFor="lastName">
                    <InputLabelText>Last Name</InputLabelText>
                  </InputLabel>
                  <BootstrapInput
                    defaultValue=""
                    id="lastName"
                    placeholder="Enter last name"
                    value={accountInfo?.lastName}
                    onChange={(e) => {
                      setAccountInfo({
                        ...accountInfo,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </InputWrapper>
                <InputWrapper variant="standard">
                  <InputLabel shrink htmlFor="mobile">
                    <InputLabelText>Mobile Number</InputLabelText>
                  </InputLabel>
                  <BootstrapInput
                    defaultValue=""
                    id="mobile"
                    type="number"
                    placeholder="Enter phone number"
                    value={accountInfo?.phoneNumber}
                    onChange={(e) => {
                      setAccountInfo({
                        ...accountInfo,
                        phoneNumber: e.target.value,
                      });
                    }}
                  />
                </InputWrapper>
                <InputWrapper variant="standard">
                  <InputLabel shrink htmlFor="mobile">
                    <InputLabelText>Date of Birth</InputLabelText>
                  </InputLabel>
                  <CustomDate
                    type="date"
                    value={accountInfo?.dob}
                    max={
                      new Date().getFullYear() +
                      "-" +
                      new Date().getMonth() +
                      1 +
                      "-" +
                      new Date().getDate()
                    }
                    // max="2023-05-20"
                    onChange={(e) => {
                      setAccountInfo({
                        ...accountInfo,
                        dob: e.target.value,
                      });
                    }}
                  />
                </InputWrapper>
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="flex-end" pt={4} pr={2}>
            <PrimaryButton
              padding="8px 20px"
              disabled={!accountInfo?.firstName}
              onClick={() => updateAccount()}
            >
              {updateLoader ? <Spinner /> : "Save"}
            </PrimaryButton>
          </Stack>
        </>
      )}
    </Wrapper>
  );
};

export default Account;
