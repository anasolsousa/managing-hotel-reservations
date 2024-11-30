import { useLocation } from "react-router-dom";

type Hotel = {
  id: string;
  name: string;
  location: string;
};

export function Details() {
  // Pegue o hotel passado via state
  const location = useLocation();
  const hotel = location.state as Hotel;  // Usando o tipo Hotel para garantir a segurança de tipo

  return (
    <div>
      <h1>Hotel Details</h1>
      {hotel ? (
        <div>
          <h2>{hotel.name}</h2>
          <p>{hotel.location}</p>
          {/* Aqui você pode adicionar mais detalhes do hotel */}
        </div>
      ) : (
        <p>No hotel selected.</p>
      )}
    </div>
  );
}
