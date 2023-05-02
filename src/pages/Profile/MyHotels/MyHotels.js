import { Link, useResolvedPath } from "react-router-dom";
import { objectTransform } from "../../../helpers/objectTransform";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

export default function MyHotels(props) {
  const url = useResolvedPath("").pathname;
  const [hotels, setHotels] = useState([]);
  const [auth] = useAuth();

  const fetchHotels = async () => {
    try {
      const res = await axios.get("hotels.json");

      const newHotels = objectTransform(res.data).filter(
        (hotel) => hotel.user_id === auth.userId
      );
      setHotels(newHotels);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`hotels/${id}.json`);
      setHotels(hotels.filter((x) => x.id !== id));
    } catch (ex) {
      console.log(ex.response);
    }
  };

  return (
    <div>
      {hotels ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nazwa</th>
              <th scope="col">Status</th>
              <th scope="col">Opcje</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.name}</td>
                <td>{hotel.status === 0 ? 'Nieaktywny' : 'Aktywny'}</td>
                <td>
                  <Link to={`/profil/hotele/edytuj/${hotel.id}`} className="btn btn-warning">Edytuj</Link>
                  <button
                    className="ms-2 btn btn-danger"
                    onClick={() => deleteHandler(hotel.id)}
                  >
                    Usuń
                  </button>
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
