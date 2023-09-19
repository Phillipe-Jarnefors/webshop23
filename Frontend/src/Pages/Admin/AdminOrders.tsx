import { useEffect, useState } from "react";
import { getOrders, updateOrders, deleteOrder } from "../../api";
import { Orders } from "../../Utilities/Interfaces";
import { useLoaderData } from "react-router";
import { Box, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export async function loader(): Promise<Orders[]> {
  return await getOrders();
}

export default function AdminOrders() {
  const orders = useLoaderData() as Orders[];

  const [data, setData] = useState<Orders[]>(orders);
  const [orderSent, setOrderSent] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const saveOrderSent = orders.reduce((acc, order) => {
      return { ...acc, [order._id]: order.isSent };
    }, {});
    setOrderSent(saveOrderSent);
  }, [orders]);

  const toggleOrder = async (id: string) => {
    const orderIsSent = !orderSent[id];

    setOrderSent((prevState) => ({
      ...prevState,
      [id]: orderIsSent,
    }));
    return await updateOrders(id, orderIsSent);
  };

  const removeOrder = async (id: string) => {
    return await deleteOrder(id);
  };

  const filterOrder = data.filter((order) => order.isDeleted !== true);

  const orderElem = filterOrder.map((order) => (
    <Paper
      elevation={2}
      key={order._id}
      sx={{
        minWidth: 210,
        width: { md: 340 },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "solid 2px gray",
        bgcolor: "darkkhaki",
        m: 1,
        p: 5,
      }}
    >
      <Box>
        <Typography>{order.name}</Typography>
        <Typography>{order.adress}</Typography>
        <Typography>{order.email}</Typography>
        <Typography>{order.phone}</Typography>
        <Typography>{order.paymentMethod}</Typography>

        {order.cart.map((item, index) => (
          <Typography key={index}>
            Product ID: {item.productId}, Quantity: {item.quantity}
          </Typography>
        ))}

        <Stack spacing={2} direction="row">
          <Button
            onClick={() => toggleOrder(order._id)}
            variant={orderSent[order._id] ? "outlined" : "contained"}
          >
            {orderSent[order._id] ? "Ordern Skickad" : "Skicka Ordern"}
          </Button>
          <HighlightOffIcon onClick={() => removeOrder(order._id)} />
        </Stack>
      </Box>
    </Paper>
  ));

  return <div style={{ display: "flex", flexWrap: "wrap" }}>{orderElem}</div>;
}
