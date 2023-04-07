function Searchbar() {
  return (
    <div className="d-flex">
      <input
        className="form-control"
        type="text"
        placeholder="Szukaj..."
      />
      <button className="btn btn-primary">Szukaj</button>
    </div>
  );
}

export default Searchbar;
