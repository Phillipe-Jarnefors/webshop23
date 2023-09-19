import { useState, useEffect } from 'react'

export default function SwishPaymentMethod({ onSubmit }) {
  const [swishInfo, setSwishInfo] = useState({
    phoneNumber: "",
    amount: "",
  });

  const handleSwishInfoChange = (e: { target: { name: string; value: number; }; }) => {
    const { name, value } = e.target;
    setSwishInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(swishInfo);
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
      setSwishInfo((prevState) => ({
        ...prevState,
        amount: parseFloat(savedTotalPrice),
      }));
    }

  }, []);


  return (
    <>
      <div>
      {/* <div>SwishPaymentMethod</div> */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Telefonnummer:
              <input
                type="text"
                name={"phoneNumber"}
                value={swishInfo.phoneNumber}
                onChange={handleSwishInfoChange}
              />
            </label>
          </div>

          <div>
            <label>
              Belopp:
              <input
                type="text"
                name="amount"
                value={swishInfo.amount}
                onChange={handleSwishInfoChange}
              />
            </label>
          </div>

          <div>
            <button type="submit">Bekräfta SWISH-betalning</button>
          </div>
        </form>
      </div>
    </>
  )
}
