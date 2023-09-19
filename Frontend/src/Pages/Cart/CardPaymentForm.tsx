import { useState, useEffect } from 'react'

export default function CardPaymentForm({ onSubmit }) {
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        cardDate: "",
        cvv: "",
    });

    const [amount, setAmount] = useState("");

    const handleCardInfoChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setCardInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAmontChange = (e) => {
        const { value } = e.target;
        setAmount(value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(cardInfo.cardNumber && cardInfo.cardDate && cardInfo.cvv && amount) {
        onSubmit({...cardInfo, amount});
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
                            />
                    </label>
                </div>
                <div>
                    <button type="submit">Bekräfta KORT-betalning</button>
                </div>
                </div>
            </form>
        </div>
    </>
  )
}
