import { Stack, styled, Typography } from "@mui/material";

const SortFilter = (props) => {
  const { sortOptions, sortOption, setSortOption } = props;

  return (
    <Stack spacing={2} direction={"row"}>
      <SortByLabel>Sort By</SortByLabel>
      {sortOptions?.map((item, i) => (
        <SortOption
          key={i}
          data={item?.key}
          selected={sortOption}
          onClick={() => setSortOption(item?.key)}
        >
          {item?.label}
        </SortOption>
      ))}
    </Stack>
  );
};

export default SortFilter;

const SortByLabel = styled(Typography)(() => ({
  fontWeight: "bold",
}));

const SortOption = styled(Typography)(({ data, selected, theme }) => ({
  color: `${data === selected ? theme?.primary?.main : ""}`,
  textDecoration: `${data === selected ? "underline" : ""}`,
  textUnderlineOffset: "6px",
  cursor: "pointer",
}));
