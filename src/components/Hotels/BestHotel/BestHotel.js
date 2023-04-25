import { useEffect, useState } from "react";
import moment from "moment";

const BestHotel = (props) => {
  const endTime = moment().add(23, 'minutes').add(34, 'seconds')

  const [time, setTime] = useState('')
  const hotel = props.getHotel();
  
  useEffect(() => {
    let interval = null
    interval = setInterval(() => {
      const leftTime = -moment().diff(endTime) / 1000
      const minutes = Math.floor(leftTime / 60)
      const seconds = Math.floor(leftTime % 60)
      setTime(`${minutes} minut ${seconds} sekund`)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="card bg-success text-white mt-2">
      <div className="card-header">Najlepsza oferta!</div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{hotel.name}</h5>
          <p>Ocena: {hotel.rating}</p>
        </div>
        <p>Do końca oferty pozostało: {time}.</p>
        <a href="/" className="btn btm-sm btn-light">
          Pokaż
        </a>
      </div>
    </div>
  );
};

export default BestHotel;
