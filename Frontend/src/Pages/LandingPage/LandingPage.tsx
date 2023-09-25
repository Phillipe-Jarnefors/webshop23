import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Grid
        container
        marginTop={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={12} md={8} textAlign="center">
          <Paper
            sx={{
              position: "relative",
              backgroundImage: "url(/leslie-soto-HRc1GLksnw0-unsplash.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              paddingBottom: "100%",
              borderRadius: "50%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, -100%)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                color="textPrimary"
                sx={{ marginBottom: "10px" }}
              >
                Hitta din nya familjemedlem!
              </Typography>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => navigate(`/products`)}
              >
                Köp nu
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
