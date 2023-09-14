import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { useState } from "react";

export default function PersonalInformation() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adress, setAdress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  const goHome = () => {
    console.log("klick på card!");
    // navigerar till butiken när man klickar "Till butiken-knappen"
    navigate(`/`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInfo = {
      firstName,
      lastName,
      email,
      phoneNumber,
      adress,
      zip,
      city,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log(userInfo);
    navigate(`/shippingmethod`);
  };

  return (
    <>
      <Container>
        <div>
          <button onClick={goHome}>TILL BUTIKEN</button>
        </div>
        <Typography variant="h6" gutterBottom>
          Shipping Information
        </Typography>
        <Grid container spacing={3}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                id="email"
                name="Email"
                label="E-mail"
                fullWidth
                autoComplete="email"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                label="Phone number"
                fullWidth
                autoComplete="phone number"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setAdress(e.target.value)}
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="shipping address"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setZip(e.target.value)}
                required
                type="number"
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setCity(e.target.value)}
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
              />
            </Grid>
            <button type="submit">GODKÄNN</button>
          </form>
        </Grid>
      </Container>
    </>
  );
}
