import axios from "../../../../axios";
import { useNavigate, useParams } from "react-router-dom";
import HotelForm from "../HotelForm";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

export default function EditHotel(props) {
  const nav = useNavigate();
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [auth] = useAuth();

  const submit = async (form) => {
    await axios.patch(`/hotels/${id}.json?auth=${auth.token}`, form);
    nav("../profil/hotele");
  };

  const fetchHotel = async () => {
    try {
      const res = await axios.get(`/hotels/${id}.json`);
      const hotelData = res.data;
      delete hotelData.user_id;
      delete hotelData.rating;
      setHotel(hotelData);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(() => {
    fetchHotel();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card">
      <div className="card-header">Edytuj hotel</div>
      <div className="card-body">
        <p className="text-muted">Uzupełnij dane hotelu</p>
        <HotelForm buttonText={"Zapisz"} onSubmit={submit} hotel={hotel} />
      </div>
    </div>
  );
}
