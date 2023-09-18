import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

export default function ShippingMethod() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/`);
  };

  const goToCheckout = () => {
    navigate(`/checkout`);
  };
  return (
    <>
      <div>
        <div>
          <button onClick={goHome}>TILL BUTIKEN</button>
        </div>

        <div>
          <Breadcrumb activeStep={2} />
        </div>

        <div>
          <button onClick={goToCheckout}>GODKÄNN</button>
        </div>
      </div>
    </>
  );
}
