import axios from "../../../../axios";
import { useNavigate, useParams } from "react-router-dom";
import HotelForm from "../HotelForm";
import { useEffect, useState } from "react";

export default function EditHotel(props) {
  const nav = useNavigate();
  const {id} = useParams()
  const [hotel, setHotel] = useState(null)

  const submit = async form => {
    await axios.put(`/hotels/${id}.json`, form);
      nav("../profil/hotele");
  }

  const fetchHotel = async () => {
    try{
        const res = await axios.get(`/hotels/${id}.json`)
        setHotel(res.data)
    } catch (ex) {
        console.log(ex.response)
    }
  }

  useEffect(()=>{
    fetchHotel()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="card">
      <div className="card-header">Edytuj hotel</div>
      <div className="card-body">
        <p className="text-muted">Uzupełnij dane hotelu</p>
        <HotelForm buttonText={'Zapisz'} onSubmit={submit} hotel={hotel} />
      </div>
    </div>
  );
}
