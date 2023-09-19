import {
  FormControl,
  RadioGroup,
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

  const calcDate = (shippingTime: number) => {
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + shippingTime);
    const formattedDate = deliveryDate.toISOString().split("T")[0];
    return formattedDate;
  };

  const PostenDelivery = calcDate(1);
  const DHLDelivery = calcDate(2);
  const PetExDelivery = calcDate(3);

  const shippingOptions = [
    {
      vendor: "Posten",
      price: 139,
      deliveryTime: PostenDelivery,
    },
    {
      vendor: "DHL",
      price: 119,
      deliveryTime: DHLDelivery,
    },
    {
      vendor: "PetEx",
      price: 89,
      deliveryTime: PetExDelivery,
    },
  ];

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHelperText("");
    setError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      setError(false);

      const selectedOption = shippingOptions.find(
        (option) => option.vendor === value
      );

      if (selectedOption) {
        localStorage.setItem("shipping", JSON.stringify(selectedOption));
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
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {shippingOptions.map((option) => (
              <Paper key={option.vendor} sx={{ padding: 4 }}>
                <FormControlLabel
                  value={option.vendor}
                  control={<Radio />}
                  label={option.vendor}
                />
                <Typography>{option.price} kr</Typography>
                <Typography>Preliminärt leveransdatum:</Typography>
                <Typography>{option.deliveryTime}</Typography>
              </Paper>
            ))}
          </Stack>
        </RadioGroup>
        <FormHelperText sx={{ fontSize: "1rem" }}>{helperText}</FormHelperText>
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
