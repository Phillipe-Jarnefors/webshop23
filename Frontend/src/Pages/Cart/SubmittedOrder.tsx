import { useNavigate } from 'react-router-dom';

export default function SubmittedOrder() {
    const navigate = useNavigate();
    const goBack = () => navigate("/");
  return (
    <>
    <div>
        <h2>Orderbekräftelse</h2>
        <h1></h1>
        <button onClick={goBack}>Till butiken</button>
        
    </div>
    </>
  )
}
