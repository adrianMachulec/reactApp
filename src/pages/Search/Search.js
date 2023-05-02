import { useParams } from "react-router-dom";
import { objectTransform } from "../../helpers/objectTransform";
import axios from "../../axios";
import { useEffect, useState } from "react";
import Hotels from "../../components/Hotels/Hotels";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

export default function Search(props) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true)
  const { term } = useParams();

  const searchHandler = async () => {
    try {
      const res = await axios.get("hotels.json");

      const newHotels = objectTransform(res.data).filter((hotel) =>
        hotel.name.toLowerCase().includes(term.toLowerCase())
      );
      setHotels(newHotels);
      setLoading(false)
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(()=>{
    searchHandler()
    // eslint-disable-next-line
  }, [term])


  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      <div>
        <h2>Wyniki dla frazy: "{term}"</h2>
      <Hotels hotels={hotels} />
      </div>
    </>
  );
}
