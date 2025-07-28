import { useState } from "react";
import "./SearchBox.css"; 

export default function SearchBox() {
  const [pg, setPg] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (evt) => {
    setPg(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const API_URL = `https://pghostelmess.com/pgadmin/api/search-result?room_type=Pg&search=${pg}&page=1`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setResults(data?.data?.data || []);
    } catch (err) {
      console.error("Error fetching PG data", err);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">PG/Hostel Search</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter location, PG name, etc..."
          required
          value={pg}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      <h3 className="results-title">Results:</h3>
      {results.length > 0 ? (
        <ul className="result-list">
          {results.map((item) => (
            <li key={item.propty_id} className="result-item">
              <strong>{item.accommodation_name}</strong>
              <p className="locality">{item.locality}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-results">No results yet or not found.</p>
      )}
    </div>
  );
}
