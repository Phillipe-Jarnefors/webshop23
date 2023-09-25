import Breadcrumb from "./Breadcrumb";
import { Grid } from "@mui/material";
import PrintShippingForm from "./PrintShippingForm";

export default function ShippingMethod() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={6} mx={"auto"}>
          <Breadcrumb activeStep={2} />
          <PrintShippingForm />
        </Grid>
      </Grid>
    </>
  );
}
