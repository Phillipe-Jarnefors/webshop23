import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, 
  Container, 
  Paper, 
  Typography, 
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup 
} from "@mui/material";
import Breadcrumb from "./Breadcrumb";
import CardPaymentForm from "./CardPaymentForm";
import SwishPaymentForm from "./SwishPaymentForm";
import { CreateOrderTemplate } from "../../Utilities/Interfaces";
import { CreateOrder } from "../../api";
import { CartContext } from "../../Utilities/CartContext";
//import ShippingMethod from "./ShippingMethod";


export default function Checkout() {
  const navigate = useNavigate();
  const { emptyCart } = useContext(CartContext)
  const goBack = () => {
    navigate(`/shippingmethod`);
  };
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(true);
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(true);
  const [isPaymentMethodVisible, setIsPaymentMethodVisible] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isPriceDetailVisible, setIsPriceDetailVisible] = useState(false);

  const [orderInfo, setOrderInfo] = useState<CreateOrderTemplate>({
    deliveryPrice: "",
    name: "",
    email: "",
    phone: "",
    adress: "",
    zip: "",
    totalPrice: "",
    cart: [],
    isSent: false,
    delivery: "",
    isDeleted: false,
  });

  useEffect(() => {
    // Load data from local storage and set it in state
    const userJSON = localStorage.getItem("userInfo");
    const shippingJSON = localStorage.getItem("shipping");
    const cartJSON = localStorage.getItem("cart");
    const totalPriceJSON = localStorage.getItem("totalPrice");

    if (userJSON && shippingJSON && cartJSON && totalPriceJSON) {
      const user = JSON.parse(userJSON);
      const shipping = JSON.parse(shippingJSON);
      const cart = JSON.parse(cartJSON);
      

      const fullName: string = user.firstName + " " + user.lastName;
      const email: string = user.email;
      const phoneNumber: string = user.phoneNumber;
      const totalAmount: string = totalPriceJSON
      const adress: string = user.adress;
      const zip: string = user.zip;
      const vendor: string = shipping.vendor;
      const price: string = shipping.price;

      const formattedCart = cart.map((cartItem: any) => ({
        productId: cartItem._id,
        quantity: cartItem.quantity,
      }));

      setOrderInfo((prevOrderInfo) => ({
        ...prevOrderInfo,
        name: fullName,
        email: email,
        phone: phoneNumber,
        adress: adress,
        zip: zip,
        totalPrice: totalAmount,
        cart: formattedCart || [],
        delivery: vendor,
        deliveryPrice: price
        
      }));
    }
  }, []);

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
    setIsBackButtonVisible(false);
  };

  const handleSwishPaymentSubmit = (swishInfo: {
    phoneNumber: string;
    amount: string;
  }) => {
    
    console.log("Swish betalning skickad:", swishInfo);
    localStorage.setItem("swishPaymentInfo", JSON.stringify(swishInfo));
    setIsPaymentFormVisible(false);
    setIsPaymentMethodVisible(false);
    setIsPriceDetailVisible(true);

  };

  const handleCardPaymentSubmit = (
    cardInfo: {
      cardNumber: string;
      cardDate: string;
      cvv: string;
    },
    amount: string
  ) => {
    
    console.log("Kortbetalning skickad:", cardInfo);
    localStorage.setItem("cardPaymentInfo", JSON.stringify(cardInfo));
    localStorage.setItem("totalAmount", JSON.stringify(amount));
    setIsPaymentFormVisible(false);
    setIsPaymentMethodVisible(false);
    setIsPriceDetailVisible(true);
  };

  const sendOrder = async () => {
    const swishJSON = localStorage.getItem("swishPaymentInfo");
    const cardJSON = localStorage.getItem("cardPaymentInfo");
    if(swishJSON || cardJSON) {
      try {
        const createdOrder = await CreateOrder(orderInfo);
        emptyCart()
        localStorage.setItem("createdOrder", JSON.stringify(createdOrder))
        navigate(`/submittedOrder`);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }else {
      alert("Choose a payment first")
    }
  };

  return (
    <Container
      elevation={0}
      sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 2,
      }}
    >
      <div>
        <Breadcrumb activeStep={3} />
      </div>
      
      <Paper
        elevation={3}
        sx={{
        p: 2,
        m: 2,
        }}
      >

        {isPaymentMethodVisible && (
          <div>
            <FormControl component="fieldset">
              <Typography 
                variant="h6"
                sx={{ mx: 4, color: "black", mt: 2, mb: 2 }}
              >
                Choose payment method
              </Typography>
              <RadioGroup
                aria-label="payment-method"
                name="payment-method"
                value={selectedPaymentMethod}
                onChange={(e: { target: { value: string; }; }) => handlePaymentMethodChange(e.target.value)}
              >
                <FormControlLabel value="swish" control={<Radio />} label="SWISH" />
                <FormControlLabel value="card" control={<Radio />} label="CARD" />
                {/* lägg till fler betalningsmetoder */}
              </RadioGroup>
            </FormControl>
          </div>
        )}

        {selectedPaymentMethod === "swish" && isPaymentFormVisible && (
          <div>
            <Typography
              variant="h3"
              sx={{ mx: 4, textAlign: "center", color: "#bc6c25", m: 3 }}
            >
              SWISH-payment
            </Typography>
            <SwishPaymentForm onSubmitSwish={handleSwishPaymentSubmit} />
          </div>
        )}

        {selectedPaymentMethod === "card" && isPaymentFormVisible && (
          <div>
            <Typography
              variant="h3"
              sx={{ mx: 4, textAlign: "center", color: "#bc6c25", m: 3 }}
            >
              CARD-payment
            </Typography>
            <CardPaymentForm onSubmitCard={handleCardPaymentSubmit} />
          </div>
        )}

          {isPriceDetailVisible && (
            <>
            <Typography
              variant="h3"
              sx={{ mx: 4, textAlign: "left", color: "black", m: 2 }}
            >
              Total:
            </Typography>

            <Typography
              variant="h3"
              sx={{ mx: 4, textAlign: "left", color: "#bc6c25", m: 2 }}
            >
              {Number(orderInfo.totalPrice) + Number(orderInfo.deliveryPrice)} kr
            </Typography>

            <Typography
              variant="h3"
              sx={{ mx: 4, textAlign: "left", color: "black", m: 2 }}
            >
              Moms: {Math.floor((Number(orderInfo.totalPrice) + Number(orderInfo.deliveryPrice)) * 0.2)} kr
            </Typography>

            <Typography
              variant="h3"
              sx={{ mx: 4, textAlign: "left", color: "black", m: 2 }}
            >
              Delivery: {orderInfo.deliveryPrice} kr
            </Typography>
            </>   
          )}

      </Paper> 

      <div>
        { isBackButtonVisible && (
        <Button 
          variant="contained" 
          onClick={goBack}  >
          Back
        </Button>
        )}
        <Button 
          type="submit" 
          onClick={sendOrder} 
          variant="contained" 
          color="success"
          sx={{ m: 2 }}  
        >
          Checkout
        </Button>
      </div>
      
    </Container>
  );
}
