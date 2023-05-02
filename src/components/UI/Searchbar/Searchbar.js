import { useEffect, useRef, useState } from "react";
//import ThemeContext from "../../../context/themeContext";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

function Searchbar(props) {
  const [term, setTerm] = useState("");
  // const theme = useContext(ThemeContext);
  const theme = useSelector(state => state.theme)
  const inputRef = useRef(null)
  const history = useNavigate()

  const search = () => {
    //props.onSearch(term);
    history(`/wyszukaj/${term}`)
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") search();
  };

  const focusInput = () => {
    inputRef.current.focus()
  }

  useEffect(() => {
    focusInput()
  }, [])

  return (
    <div className="d-flex">
      <input
        ref={inputRef}
        value={term}
        onKeyDown={onKeyDownHandler}
        onChange={(e) => setTerm(e.target.value)}
        className="form-control"
        type="text"
        placeholder="Szukaj..."
      />
      <button className={`btn btn-${theme} ms-1`} onClick={search}>
        Szukaj
      </button>
    </div>
  );
}

export default Searchbar;
