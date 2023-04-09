import { useState } from "react";
import PropTypes from 'prop-types'

function Searchbar(props) {

  const [term, setTerm] = useState('')

  const search = () => {
    props.onSearch(term)
  }

  const onKeyDownHandler = (e) => {
    if(e.key === 'Enter') search()
  }

  return (
    <div className="d-flex">
      <input
        value={term}
        onKeyDown={onKeyDownHandler}
        onChange={e => setTerm(e.target.value) }
        className="form-control"
        type="text"
        placeholder="Szukaj..."
      />
      <button 
        className="btn btn-secondary ms-1"
        onClick={search}
      >Szukaj</button>
    </div>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default Searchbar;
