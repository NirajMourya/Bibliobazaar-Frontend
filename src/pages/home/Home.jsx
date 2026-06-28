import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Wrapper } from "../../shared/styles/globalStyles";
import Filter from "../../assets/icons/filter.svg";
import {
  CardContainer,
  FilterBtn,
  FilterContainer,
  NoBooksContent,
} from "./Home.styles";
import AccordionFilter from "./components/accordionFilter/AccordionFilter";
import { genreFilter, languageFilter, sortOptions } from "./data";
import SortFilter from "./components/sortFilter/SortFilter";
import { useEffect, useState } from "react";
import BookCard from "../../shared/components/bookCard/BookCard";
import { userSearch } from "../../config/Config";
import { useSelector } from "react-redux";

const Home = () => {
  const { search, user, searchTrigger } = useSelector((state) => state.user);

  const [sortOption, setSortOption] = useState(sortOptions[0]?.key);
  const [languageSelected, setLanguageSelected] = useState([]);
  const [genreSelected, setGenreSelected] = useState([]);
  const [getBooksUrl, setGetBooksUrl] = useState(userSearch);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    console.log("sortOption", sortOption);
    console.log("languageFilter", languageSelected);
    console.log("genreFilter", genreSelected);
    console.log("search", search);
    console.log("searchTrigger", searchTrigger);
    let url = `${userSearch}?q=${search}&lang=${languageSelected.join(
      ","
    )}&genre=${genreSelected.join(
      ","
    )}&sortBy=rentExpected&order=${sortOption}`;
    setGetBooksUrl(url);
  }, [sortOption, languageSelected, genreSelected, searchTrigger]);

  useEffect(() => {
    getBooks();
  }, [getBooksUrl, isLoggedIn]);

  const getBooks = () => {
    setLoader(true);
    axios
      .post(getBooksUrl)
      .then((res) => {
        if (res?.status === 200) {
          const filteredArray = res?.data?.filter(
            (item) => item?.userId !== user?.userId
          );
          // setBookList(res?.data);
          setBookList([...filteredArray]);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setLoader(false);
        toast.error(err?.message || "Something is wrong");
        throw Error(`Fetching of books failed for this url: ${getBooksUrl}`);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Wrapper>
      {/* Top Section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <FilterBtn>
          {/* <Stack direction="row" spacing={1}>
            <img src={Filter} alt="" />
            <Typography>Filter</Typography>
          </Stack> */}
        </FilterBtn>
        <Box>
          <Typography>{bookList?.length} Books</Typography>
        </Box>
      </Stack>
      {/* Main Body */}
      <Stack
        direction="row"
        justifyContent="flexStart"
        spacing={4}
        mt={4}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "32px", sm: "" },
        }}
      >
        {/* Left Filter */}
        <FilterContainer>
          <AccordionFilter
            data={languageFilter}
            value={languageSelected}
            setInfo={setLanguageSelected}
          />
          <AccordionFilter
            data={genreFilter}
            value={genreSelected}
            setInfo={setGenreSelected}
          />
        </FilterContainer>
        {/* Right Container */}
        <CardContainer>
          <SortFilter
            sortOptions={sortOptions}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <Grid container spacing={4} mt={2}>
            {loader
              ? Array?.from({ length: 5 }).map((data, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Skeleton
                      variant={"rectangular"}
                      width={300}
                      height={300}
                    />
                  </Grid>
                ))
              : bookList?.map((book, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <BookCard data={book} />
                  </Grid>
                ))}
            {bookList?.length === 0 && !loader ? (
              <NoBooksContent>No Books Available</NoBooksContent>
            ) : null}
          </Grid>
        </CardContainer>
      </Stack>
    </Wrapper>
  );
};

export default Home;
