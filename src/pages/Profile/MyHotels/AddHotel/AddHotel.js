import axios from "../../../../axios";
import { useNavigate } from "react-router-dom";
import HotelForm from "../HotelForm";

export default function AddHotel(props) {
  const nav = useNavigate();

  const submit = async form => {
    await axios.post("./hotels.json", form);
      nav("../profil/hotele");
  }


  return (
    <div className="card">
      <div className="card-header">Dodaj hotel</div>
      <div className="card-body">
        <p className="text-muted">Uzupełnij dane hotelu</p>
        <HotelForm buttonText={'Dodaj'} onSubmit={submit} />
      </div>
    </div>
  );
}