import { Breadcrumbs, Typography } from "@mui/material";
import { BreadcrumbsProps } from "../../Utilities/Interfaces";

function Breadcrumb({ activeStep }: BreadcrumbsProps) {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Typography variant="h6" fontWeight={activeStep === 1 ? "bold" : ""}>
        Profile
      </Typography>
      <Typography variant="h6" fontWeight={activeStep === 2 ? "bold" : ""}>
        Shipping
      </Typography>
      <Typography variant="h6" fontWeight={activeStep === 3 ? "bold" : ""}>
        Payment
      </Typography>
    </Breadcrumbs>
  );
}

export default Breadcrumb;
