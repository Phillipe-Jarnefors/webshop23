import { useState, useEffect } from "react";
import { CardPaymentFormProps } from "../../Utilities/Interfaces";
import { Button, Container, TextField } from "@mui/material";

export default function CardPaymentForm({
onSubmitCard,
shippingCost
}: CardPaymentFormProps) {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardDate: "",
    cvv: "",
  });

  const [amount, setAmount] = useState("");

  const isCardInfoValid = () => {
    return (
      cardInfo.cardNumber.trim() !== "" &&
      cardInfo.cardDate.trim() !== "" &&
      cardInfo.cvv.trim() !== ""
    );
  };

  const handleCardInfoChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAmontChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cardInfo.cardNumber && cardInfo.cardDate && cardInfo.cvv && amount && shippingCost !== null ) {
      onSubmitCard(cardInfo, amount, shippingCost);
    } else {
      alert("Fyll i alla fält!");
      console.log("Fyll i alla fält!");
    }
  };

  useEffect(() => {
  const savedTotalPrice = localStorage.getItem("totalPrice");
  const shippingCost= localStorage.getItem("shipping");
  if (savedTotalPrice && shippingCost !== null) {  
    const parsedShipping = shippingCost ? JSON.parse(shippingCost): null;
    const totalAmount = Number(savedTotalPrice) + Number(parsedShipping.price);
    setAmount(totalAmount.toString());
  }
}, [shippingCost]);

  

  return (
    <>
      <Container>

          <form onSubmit={handleSubmit}>

            <div>
              <TextField
                type="text"
                name="cardNumber"
                label="Card Number"
                variant="outlined"
                fullWidth
                value={cardInfo.cardNumber}
                onChange={handleCardInfoChange}
                sx={{ mt: 1, mb: 1}}   
              />
            </div>

            <div>
              <TextField
                type="date"
                name="cardDate"
                label="Expiration Date"
                variant="outlined"
                fullWidth
                value={cardInfo.cardDate}
                onChange={handleCardInfoChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mt: 1, mb: 1}} 
              />
            </div>

            <div>
              <TextField
                type="text"
                name="cvv"
                label="CVV"
                variant="outlined"
                fullWidth
                value={cardInfo.cvv}
                onChange={handleCardInfoChange}
                sx={{ mt: 1, mb: 1}} 
              />
            </div>

            <div>
              <TextField
                type="text"
                name="amount"
                label="Total"
                variant="outlined"
                fullWidth
                value={amount} 
                onChange={handleAmontChange}
                sx={{ mt: 1, mb: 1}} 
                disabled
              />
            </div>

            <div>
              <Button 
                type="submit" 
                disabled={!isCardInfoValid()} 
                variant="contained" 
                sx={{ mt: 2, mb: 1}}  
              >
                ACCEPT
              </Button>
            </div>

          </form>
        
      </Container>
    </>
  );
}
