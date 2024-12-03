import { useLocation, useNavigate } from "react-router-dom";


export function Details() {

  // Pegue o hotel passado via state
  const location = useLocation();
  const hotel = location.state as Home; // Use o tipo Hotel

  const navigate = useNavigate(); // Corrigir a falta da declaração de navigate

  // UseState e função de navegação para detalhes
  const handelHotelSelect = (hotel: Home) => {
    navigate("/details", { state: hotel });
  };
  
  console.log(hotel.cancellationPolicy.description)
  return (
    <div>
      <h1>Hotel Details</h1>
      {hotel ? (
        <div>
          <h2>{hotel.name}</h2>
          <p>{hotel.location}</p>
          <p>{hotel.description}</p>
          <p>{hotel.cancellationPolicy.description}</p>

          
          
          
        </div>
      ) : (
        <p>No hotel selected.</p>
      )}
    </div>
  );
}
