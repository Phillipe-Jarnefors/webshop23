import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
// import { useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import CardPaymentForm from "./CardPaymentForm";
import SwishPaymentForm from "./SwishPaymentForm";
import { CreateOrderTemplate } from "../../Utilities/Interfaces";
import { CreateOrder } from "../../api";

const totalAmount = localStorage.getItem("totalAmount");
const userJSON = localStorage.getItem("userInfo");
const shippingJSON = localStorage.getItem("shipping");
const user = userJSON !== null ? JSON.parse(userJSON) : null;
const shipping = shippingJSON !== null ? JSON.parse(shippingJSON) : null;
const cartJSON = localStorage.getItem("cart");
const cart = cartJSON !== null ? JSON.parse(cartJSON) : null;

interface People {
  firstName: string;
  lastName: string;
  adress: string;
  email: string;
  phoneNumber: string;
  zip: string;
  fullName: string;
  vendor: string;
}

const firstName = user.firstName;
const lastName = user.lastName;
const adress = user.adress;
const email = user.email;
const phoneNumber = user.phoneNumber;
const zip = user.zip;
const fullName = firstName + lastName;
const vendor = shipping.vendor;

export default function Checkout() {
  const [orderInfo, setOrderInfo] = useState<CreateOrderTemplate>([{
    name: fullName;
    email: email;
    phone: phoneNumber;
    adress: adress;
    zip: zip;
    cart: [
      {
        productId: string;
        quantity: number;
      }
    ];
    isSent: false;
    delivery: vendor;
    isDeleted: false;
  }]);

  // const { paymentMethod } = useParams();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleSwishPaymentSubmit = (swishInfo: {
    phoneNumber: string;
    amount: string;
  }) => {
    // skicka informationen till BE ?
    console.log("Swish  betalning skickad:", swishInfo);
    // spara i localStorage
    localStorage.setItem("swishPaymentInfo", JSON.stringify(swishInfo));
    //localStorage.clear()
    navigate(`/submittedOrder`);
  };

  const handleCardPaymentSubmit = (
    cardInfo: {
      cardNumber: string;
      cardDate: string;
      cvv: string;
    },
    amount: string
  ) => {
    // skicka informationen till BE ?
    console.log("Kortbetalning skickad:", cardInfo);
    // spara i localStorage/ kryptera???
    localStorage.setItem("cardPaymentInfo", JSON.stringify(cardInfo));
    localStorage.setItem("totalAmount", JSON.stringify(amount));
    navigate(`/submittedOrder`);
  };

  const sendOrder = async () => {
    await CreateOrder(orderInfo)
  };



  return (
    <>
      <Container>
        <div>
          <Breadcrumb activeStep={3} />
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="swish"
              checked={selectedPaymentMethod === "swish"}
              onChange={() => handlePaymentMethodChange("swish")}
            />
            SWISH
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              value="betalkort"
              checked={selectedPaymentMethod === "betalkort"}
              onChange={() => handlePaymentMethodChange("betalkort")}
            />
            BETALKORT
          </label>
        </div>

        {selectedPaymentMethod === "swish" && (
          <div>
            <h2>SWISH-betalning</h2>
            <SwishPaymentForm onSubmitSwish={handleSwishPaymentSubmit} />
          </div>
        )}

        {selectedPaymentMethod === "betalkort" && (
          <div>
            <h2>KORT-betalning</h2>
            <CardPaymentForm onSubmitCard={handleCardPaymentSubmit} />
          </div>
        )}

        <div>
          <button>Checkout</button>
        </div>
      </Container>
    </>
  );
}
