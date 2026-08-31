import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Wrapper } from "../../shared/styles/globalStyles";
import {
  CardContainer,
  FilterBtn,
  FilterContainer,
  NoBooksContent,
} from "./Home.styles";
import AccordionFilter from "./components/accordionFilter/AccordionFilter";
import { genreFilter, languageFilter, sortOptions } from "./data";
import SortFilter from "./components/sortFilter/SortFilter";
import { useCallback, useEffect, useRef, useState } from "react";
import BookCard from "../../shared/components/bookCard/BookCard";
import BookCardSkeleton from "../../shared/components/bookCard/BookCardSkeleton";
import { userSearch } from "../../config/Config";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 9;

// Build a { key: label } lookup for rendering filter chips
const languageLabels = Object.fromEntries(
  languageFilter.data.map((item) => [item.key, item.label])
);
const genreLabels = Object.fromEntries(
  genreFilter.data.map((item) => [item.key, item.label])
);

const Home = () => {
  const { search, user, searchTrigger } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortOption, setSortOption] = useState(
    searchParams.get("sortBy") || sortOptions[0]?.key
  );
  const [languageSelected, setLanguageSelected] = useState(
    searchParams.get("lang")?.split(",").filter(Boolean) || []
  );
  const [genreSelected, setGenreSelected] = useState(
    searchParams.get("genre")?.split(",").filter(Boolean) || []
  );
  const [getBooksUrl, setGetBooksUrl] = useState(userSearch);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const observer = useRef();

  // Attach to the last visible card so scrolling near it reveals the next page
  const lastBookRef = useCallback(
    (node) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, bookList.length));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loader, bookList.length]
  );

  useEffect(() => {
    let url = `${userSearch}?q=${search}&lang=${languageSelected.join(
      ","
    )}&genre=${genreSelected.join(
      ","
    )}&sortBy=rentExpected&order=${sortOption}`;
    setGetBooksUrl(url);

    // Keep filters shareable/bookmarkable via the URL
    const params = {};
    if (languageSelected.length) params.lang = languageSelected.join(",");
    if (genreSelected.length) params.genre = genreSelected.join(",");
    if (sortOption) params.sortBy = sortOption;
    setSearchParams(params, { replace: true });
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
          setVisibleCount(PAGE_SIZE);
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

  const removeLanguage = (key) =>
    setLanguageSelected((prev) => prev.filter((item) => item !== key));
  const removeGenre = (key) =>
    setGenreSelected((prev) => prev.filter((item) => item !== key));
  const clearAllFilters = () => {
    setLanguageSelected([]);
    setGenreSelected([]);
  };

  const hasActiveFilters = languageSelected.length > 0 || genreSelected.length > 0;

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
          {hasActiveFilters ? (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {languageSelected.map((key) => (
                <Chip
                  key={`lang-${key}`}
                  label={languageLabels[key] || key}
                  onDelete={() => removeLanguage(key)}
                  size="small"
                />
              ))}
              {genreSelected.map((key) => (
                <Chip
                  key={`genre-${key}`}
                  label={genreLabels[key] || key}
                  onDelete={() => removeGenre(key)}
                  size="small"
                />
              ))}
              <Chip label="Clear all" onClick={clearAllFilters} size="small" variant="outlined" />
            </Stack>
          ) : null}
        </FilterBtn>
        <Box>
          <Typography>{bookList?.length} Books</Typography>
        </Box>
      </Stack>
      {/* Main Body */}
      <Stack
        direction="row"
        justifyContent="flexStart"
        alignItems="flex-start"
        spacing={3}
        mt={3}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "24px", sm: "" },
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
          <Grid container spacing={3} mt={2}>
            {loader
              ? Array?.from({ length: 6 }).map((data, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <BookCardSkeleton />
                  </Grid>
                ))
              : bookList?.slice(0, visibleCount).map((book, index, arr) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    key={book?.bookId || index}
                    ref={index === arr.length - 1 ? lastBookRef : null}
                  >
                    <BookCard data={book} />
                  </Grid>
                ))}
            {!loader && visibleCount < bookList?.length ? (
              <Grid item xs={12} sm={4}>
                <BookCardSkeleton />
              </Grid>
            ) : null}
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
