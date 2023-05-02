import { Link, useResolvedPath } from "react-router-dom";
import { objectTransform } from "../../../helpers/objectTransform";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

export default function MyHotels(props) {
  const url = useResolvedPath("").pathname;
  const [hotels, setHotels] = useState([]);
  const [auth] = useAuth()

  const fetchHotels = async () => {
    try {
      const res = await axios.get("hotels.json");

      const newHotels = objectTransform(res.data).filter(hotel => hotel.user_id === auth.userId);
      setHotels(newHotels);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {hotels ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nazwa</th>
              <th scope="col">Opcje</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.name}</td>
                <td>
                  <button className="btn btn-warning">Edytuj</button>
                  <button className="ms-2 btn btn-primary">Edytuj</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nie masz jeszcze żadnego hotelu.</p>
      )}

      <Link to={`${url}/dodaj`} className="btn btn-primary">
        Dodaj hotel
      </Link>
    </div>
  );
}
