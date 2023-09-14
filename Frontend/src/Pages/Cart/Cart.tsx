import { useContext } from "react";
import { CartContext } from "../../Utilities/CartContext";
import { useNavigate } from "react-router-dom";
import { Product } from '../../Utilities/Interfaces.ts';
import Button from '@mui/material/Button';
import CartIcon from "@mui/icons-material/AddShoppingCart";
import { Paper, Typography, Avatar, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


function Cart () {
  
  const { addToCart } = useContext(CartContext);
  const { removeFromCart } = useContext(CartContext);
  
  const { cart } = useContext(CartContext);
  console.log(cart);
  const navigate = useNavigate();

  const goHome = () => {
      console.log("klick på card!");
      navigate(`/`);
  }
  const goToPersInfo = () => {
      console.log("klick på card!");
      navigate(`/userinfo`);
  }

  const calculateTotalPrice = () => {
      return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleRemoveClick = (product: Product) => {
      removeFromCart(product);
};

  return (
    <>
    <div>
        <button onClick={goHome}>TILL BUTIKEN</button>
    </div>

    <div>

      <Container>
        <Typography variant="h5" 
                    sx={{ color: 'primary.main', my: 1, display: "flex",justifyContent: "center" }}>
            <h2>VARUKORGEN</h2>         
        </Typography>
      </Container>
       
    <Container>
      {cart.length === 0 ? (

        <h2>Din kundvagn är tom</h2>
        ) : (
            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'vänster', p: 0}}>
              <div>
                <ul>
                  {cart.map((product, index) => (
                    <li style={{listStyle: "none", 
                                border: "solid grey 0.5px", 
                                margin: "0px", 
                                padding: "15px"}} 
                        key={index}>
                          <Avatar
                            variant={"rounded"}
                            alt={product.name}
                            src={product.image}
                            style={{ width: 160, height: 160, marginTop: "10px" }}
                          />

                            <Typography variant="h5" sx={{ color: 'primary.main', my: 1 }}>
                                        {product.name}</Typography>
                                   
                            <Typography variant="h7" sx={{ mt: 3, color: 'black' }}>Pris: 
                                        {product.price} kr</Typography>
                                    
                              <p>Kvantitet: {product.quantity}</p> 
                              
                              <Button
                                variant="contained"
                                endIcon={<CartIcon />}
                                sx={{ marginBottom: "10px" }}
                                onClick={() => addToCart(product)}
                                    
                                >Lägg till
                                </Button>

                                <Button variant="outlined" 
                                  endIcon={<DeleteIcon />}
                                  sx={{ marginBottom: "10px" }}
                                  onClick={() => handleRemoveClick(product._id)}
                                >Ta bort
                                </Button>

                                </li>
                        ))}
                          </ul>
                            <h2>Totalt: {calculateTotalPrice()} kr</h2>  

                            <button onClick={goToPersInfo}>GÅ TILL KASSAN</button> 
                    </div>

            </Paper>            
        )}
    </Container>
    </div>
    </>
  );
}

export default Cart;
