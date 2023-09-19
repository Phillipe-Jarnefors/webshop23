import {
  FormControl,
  RadioGroup,
  Divider,
  Paper,
  FormControlLabel,
  Radio,
  Typography,
  FormHelperText,
  Grid,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrintShippingForm() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/userinfo`);
  };

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const shippingOptions: Record<
    string,
    { vendor: string; price: number; deliveryTime: number }
  > = {
    Posten: {
      vendor: "Posten",
      price: 139,
      deliveryTime: 1,
    },
    DHL: {
      vendor: "DHL",
      price: 119,
      deliveryTime: 2,
    },
    PetEx: {
      vendor: "PetEx",
      price: 89,
      deliveryTime: 3,
    },
  };

  const calcDate = (shippingTime: number) => {
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + shippingTime);
    const formattedDate = deliveryDate.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHelperText("");
    setError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      setError(false);

      if (shippingOptions[value]) {
        const shippingData = {
          ...shippingOptions[value],
          deliveryTime: calcDate(shippingOptions[value].deliveryTime),
        };
        localStorage.setItem("shipping", JSON.stringify(shippingData));
        navigate(`/checkout`);
      }
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        error={error}
        sx={{
          display: "flex",
          flexFlow: "column",
          gap: 2,
          alignItems: "center",
          width: "100%",
        }}
      >
        <RadioGroup
          value={value}
          name="radio-buttons-group"
          onChange={handleRadioChange}
          sx={{ gap: 2, margin: 1 }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            divider={<Divider orientation="vertical" flexItem />}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {Object.keys(shippingOptions).map((option) => (
              <Paper key={option} sx={{ padding: 4, width: "100%" }}>
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={option}
                />
                <Typography>{shippingOptions[option].price} kr</Typography>
                <Typography>
                  Leveranstid: {shippingOptions[option].deliveryTime}{" "}
                  {shippingOptions[option].deliveryTime >= 2 ? "dagar" : "dag"}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={goBack}
          >
            TILLBAKA
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" sx={{ marginTop: "20px" }} type="submit">
            FORTSÄTT
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
