import { useState, useEffect } from "react";
import { CardPaymentFormProps } from "../../Utilities/Interfaces";
import { Button } from "@mui/material";

export default function CardPaymentForm({
  onSubmitCard,
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

    if (cardInfo.cardNumber && cardInfo.cardDate && cardInfo.cvv && amount) {
      onSubmitCard(cardInfo, amount);
    } else {
      alert("Fyll i alla fält!");
      console.log("Fyll i alla fält!");
    }
  };

  useEffect(() => {
    const savedTotalPrice = localStorage.getItem("totalPrice");
    if (savedTotalPrice) {
      setAmount(savedTotalPrice);
    }
  }, []);

  return (
    // <div>CardPaymentForm</div>
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Kortnummer:
              <input
                type="text"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={handleCardInfoChange}
              />
            </label>
            <div>
              <label>
                Utgångsdatum:
                <input
                  type="date"
                  name="cardDate"
                  value={cardInfo.cardDate}
                  onChange={handleCardInfoChange}
                />
              </label>
            </div>
            <div>
              <label>
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={cardInfo.cvv}
                  onChange={handleCardInfoChange}
                />
              </label>
            </div>
            <div>
              <label>
                Belopp:
                <input
                  type="text"
                  name="amount"
                  value={amount}
                  onChange={handleAmontChange}
                  disabled
                />
              </label>
            </div>
            <div>
              <Button type="submit" disabled={!isCardInfoValid()} variant="contained" color="success">
                Bekräfta Kortbetalning
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
