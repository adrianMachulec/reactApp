import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from "../../axios";

function Hotel(props) {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const setTitle = useWebsiteTitle();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`hotels/${id}.json`);
        setHotel(res.data);
        setTitle(`Hotel ${res.data.name}`);
        setLoading(false);
      } catch (ex) {
        console.log(ex.response);
      }

      
      setLoading(false);
    };
    fetchHotel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? <LoadingIcon /> : <h1>Hotel: {hotel.name}</h1>;
}

export default Hotel;
