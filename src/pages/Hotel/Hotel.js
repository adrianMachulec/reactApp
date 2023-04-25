import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

function Hotel(props) {
  //const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = () => {
      setHotel({
        id: 2,
        name: "Dębowy",
        city: "Lublin",
        rating: 8.8,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum, risus vitae venenatis pulvinar, neque velit laoreet quam, a blandit enim dolor ac ligula.",
        image: "",
      });
      setLoading(false);
    };
    setTimeout(() => {
      fetchHotel();
    }, 500);
  }, []);

  return loading ? <LoadingIcon /> : <h1>Hotel: {hotel.name}</h1>;
}

export default Hotel;
