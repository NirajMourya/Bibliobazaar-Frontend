import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const AccordionFilter = (props) => {
  const {
    data: { heading, data },
    value,
    setInfo,
  } = props;

  return (
    <Accordion elevation={0} disablegutters={"true"}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        disablegutters={"true"}
      >
        <Typography sx={{ fontWeight: "bold" }}>{heading}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data?.map((item, index) => (
          <CheckBoxFilter
            info={item}
            key={item?.key}
            value={value}
            setInfo={setInfo}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const CheckBoxFilter = (props) => {
  const {
    info: { key, label },
    value,
    setInfo,
  } = props;

  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setInfo([...value, key]);
    } else {
      let temp = [...value];
      const index = temp.indexOf(key);
      if (index > -1) {
        temp.splice(index, 1);
      }
      setInfo([...temp]);
    }
  };

  return (
    <Stack
      spacing={4}
      direction="row"
      alignItems="center"
      justifyContent="spaceBetween"
    >
      <Typography sx={{ minWidth: "100px" }}>{label}</Typography>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Stack>
  );
};

export default AccordionFilter;
