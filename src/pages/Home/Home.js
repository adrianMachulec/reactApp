import LastHotel from "../../components/Hotels/LastHotel/LastHotel";
import useStateStorage from "../../hooks/useStateStorage";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import BestHotel from "../../components/Hotels/BestHotel/BestHotel";
import Hotels from "../../components/Hotels/Hotels";
import { useCallback, useEffect, useState } from "react";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import axios from "../../axios";
import { objectTransform } from "../../helpers/objectTransform";

export default function Home(props) {
  useWebsiteTitle("Strona główna");
  const [lastHotel, setLastHotel] = useStateStorage("last-hotel", null);
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);

  const getBestHotel = useCallback(() => {
    if (hotels.length <= 1) {
      return null;
    } else {
      return hotels.sort((a, b) => (a.rating > b.rating ? -1 : 1))[0];
    }
  }, [hotels]);

  const openHotel = (hotel) => {
    setLastHotel(hotel);
  };

  const removeLastHotel = () => {
    setLastHotel(null);
  };

  const fetchHotels = async () => {
    try {
      const res = await axios.get("hotels.json");

      const newHotels = objectTransform(res.data);
      setHotels(newHotels);
    } catch (ex) {
      console.log(ex.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      {lastHotel ? (
        <LastHotel {...lastHotel} onRemove={removeLastHotel} />
      ) : null}
      {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
      <Hotels onOpen={openHotel} hotels={hotels} />
    </>
  );
}
