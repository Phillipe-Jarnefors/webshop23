import { useState, useEffect } from 'react'
import { SwishPaymentFormProps } from '../../Utilities/Interfaces';
import { Container, Button, TextField } from "@mui/material";

export default function SwishPaymentMethod({ onSubmitSwish }: SwishPaymentFormProps) {
  const [swishInfo, setSwishInfo] = useState({
    phoneNumber: "",
    amount: "",
    shippingCost: ""
  });

  const handleSwishInfoChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setSwishInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitSwish(swishInfo);
  };

  // hämta telefonnummer från localStorage
  useEffect(() => {
    const savedPhonedNumber = localStorage.getItem("phoneNumber");
    if (savedPhonedNumber) {
      setSwishInfo((prevState) => ({
        ...prevState,
        phoneNumber: savedPhonedNumber,
      }));
    }
  }, []);

  // hämta totalPrice
  useEffect(() => {
  const savedTotalPrice = localStorage.getItem("totalPrice");
  if (savedTotalPrice) {
    // hämtar fraktkostnad 
    const selectedShipping = localStorage.getItem("shipping");
    const parsedShipping = selectedShipping ? JSON.parse(selectedShipping): null;
    const shippingCost = parsedShipping ? parsedShipping.price : 0;

    // lägger till fraktkostnad till totalpriset
    const totalAmount = parseFloat(savedTotalPrice) + shippingCost;
    
    setSwishInfo((prevState) => ({
      ...prevState,
      amount: totalAmount.toString(),
    }));
  }
}, []);

  return (
    <>
      <Container>
        
          <form onSubmit={handleSubmit}>

            <div>
              <TextField
                type="text"
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={swishInfo.phoneNumber}
                onChange={handleSwishInfoChange}
                sx={{ mt: 1, mb: 1}} 
                disabled
              />
            </div>

            <div>
              <TextField
                type="text"
                name="amount"
                label="Total"
                variant="outlined"
                fullWidth
                value={swishInfo.amount}
                onChange={handleSwishInfoChange}
                sx={{ mt: 1, mb: 1}} 
                disabled
              />
            </div>

            <div>
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ mt: 2, mb: 1 }}  
              >
                  ACCEPT
              </Button>
            </div>

          </form>
        
      </Container>
    </>
  )
}
