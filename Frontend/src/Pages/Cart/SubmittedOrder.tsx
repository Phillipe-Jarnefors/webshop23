import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Container, Button } from "@mui/material";
import { useEffect, useRef } from 'react';

export default function SubmittedOrder() {
    const navigate = useNavigate();
    const popstateListener = useRef(false);

    useEffect(() => {
      if (!popstateListener.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handlePopState = (e: { state: any; }) => {
          if (e.state) {
            navigate('/products');
            localStorage.clear();
          }
        };
        window.addEventListener('popstate', handlePopState);
        popstateListener.current = true;
      }
      return () => {
        // tom return för att behålla eventlyssnaren och hantera den vid komponentåteraktivering    
      };  
    }, [navigate]);


    const goBack = () => {
      navigate('/products');
      localStorage.clear();
    };

    const orderInfoJSON = localStorage.getItem("createdOrder");
    const cartItemsJSON = localStorage.getItem("cart")

    if (orderInfoJSON) {
      const orderInfo = JSON.parse(orderInfoJSON);

    // hämtar fraktkostnad 
    const selectedShipping = localStorage.getItem("shipping");
    const parsedShipping = selectedShipping ? JSON.parse(selectedShipping): null;
    const shippingCost = parsedShipping ? parsedShipping.price : 0;

    // lägger till fraktkostnad till totalpriset
    const totalAmount = parseFloat(orderInfo.totalPrice) + shippingCost;

        return (
          <>
          <Container>
            <Paper
              elevation={0}
              sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              }}
            >
              <Typography>

              <Typography
                variant="h2"
                sx={{ mx: 4, textAlign: "center", color: "black", m: 5 }}
              >
                Thank you!
              </Typography>

              <Typography
                variant="h3"
                sx={{ mx: 4, textAlign: "left", color: "black", m: 2 }}
              >
                Your order:
              </Typography>

              <Typography
                variant="h6"
                sx={{ mx: 4, textAlign: "left", color: "#bc6c25", m: 2 }}
              >
                {orderInfo._id}
              </Typography>
                  
              <Typography
                variant="h6"
                sx={{ mx: 4, textAlign: "left", color: "black", m: 2 }}
              >
                Name: {orderInfo.name}
              </Typography>

              <Typography
                variant="h6"
                sx={{ mx: 4, textAlign: "left", color: "black", m: 2 }}
              >
                Email: {orderInfo.email}
              </Typography>

              <Typography
                variant="h3"
                sx={{ mx: 4, textAlign: "left", color: "black", m: 2 }}
              >
                Products:
              </Typography>
              
              <Typography
                sx={{ mx: 4, textAlign: "left", color: "#bc6c25", m: 2 }}
              >
                {cartItems.map((item: {name: string}, index: string) => (
                  <Typography
                  key={index}
                  variant="h4"
                  sx={{textAlign: "left", color: "black", my: "0.5rem"}}
                >
                  {item.name}
                </Typography>
                ))}
              </Typography>

              <Typography
                variant="h6"
                sx={{ mx: 4, textAlign: "left", color: "black", m: 2 }}
              >
                Delivery: {orderInfo.delivery}
              </Typography>

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
                {totalAmount} kr
              </Typography>

              <Button 
                variant="contained" 
                color="success"
                onClick={goBack}
                sx={{ mx: 4, textAlign: "left", m: 2 }}  
              >
                Back
              </Button>
                  
              </Typography>
              
            </Paper>
          </Container>
          </>
        )
    }
    return (
      <Container>
        <Paper
          elevation={0}
          sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 5,
          }}
        >
      <Typography
        variant="h3"
      >
        No order information found
      </Typography>
      </Paper>
      </Container>
    );
}