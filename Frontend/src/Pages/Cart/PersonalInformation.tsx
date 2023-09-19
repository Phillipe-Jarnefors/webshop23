import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Button from "@mui/material/Button";

export default function PersonalInformation() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/`);
  };
  const goBack = () => {
    navigate(`/cart`);
  };

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    adress: "",
    zip: "",
    city: "",
  });

  function handleChange(e: {
    target: { name: string; value: string | number };
  }) {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userInfo", JSON.stringify(userInput));
    localStorage.setItem("phoneNumber", userInput.phoneNumber);
    navigate(`/shippingmethod`);
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <button onClick={goHome}>TILL BUTIKEN</button>
            </div>
          </Grid>

          <Grid item xs={12} sm={8} md={6} mx={"auto"}>
            <Breadcrumb activeStep={1} />
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexFlow: "column", gap: "1rem" }}
            >
              <TextField
                onChange={handleChange}
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />

              <TextField
                onChange={handleChange}
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />

              <TextField
                onChange={handleChange}
                required
                type="email"
                id="email"
                name="email"
                label="E-mail"
                fullWidth
                autoComplete="email"
                variant="standard"
              />

              <TextField
                onChange={handleChange}
                required
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                label="Phone number"
                fullWidth
                autoComplete="phone number"
                variant="standard"
              />

              <TextField
                onChange={handleChange}
                required
                id="adress"
                name="adress"
                label="Adress"
                fullWidth
                autoComplete="shipping adress"
                variant="standard"
              />

              <TextField
                onChange={handleChange}
                required
                type="number"
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
              />

              <TextField
                onChange={handleChange}
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping adress-level2"
                variant="standard"
              />
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ marginTop: "20px" }}
                    onClick={goBack}
                  >
                    Avbryt
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ marginTop: "20px" }}
                    type="submit"
                  >
                    GODKÄNN
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
