import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddStation, setShowAddStation] = useState(false);

  const [stations, setStations] = useState([
    {
      id: 1,
      name: "PC-01",
      tier: "Regular",
      rate: 20,
    },
    {
      id: 2,
      name: "PC-02",
      tier: "Regular",
      rate: 20,
    },
    {
      id: 3,
      name: "PC-03",
      tier: "Premium",
      rate: 30,
    },
  ]);

  const [stationName, setStationName] = useState("");
  const [tier, setTier] = useState("");
  const [rate, setRate] = useState("");
  const [formError, setFormError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "cafe_admin" && password === "pcshop2026") {
      setError("");
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleAddStation = (e) => {
    e.preventDefault();

    if (!stationName || !tier || !rate) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (Number(rate) <= 0) {
      setFormError("Hourly rate must be greater than 0.");
      return;
    }

    const newStation = {
      id: stations.length + 1,
      name: stationName,
      tier: tier,
      rate: Number(rate),
    };

    setStations([...stations, newStation]);

    setStationName("");
    setTier("");
    setRate("");
    setFormError("");
    setShowAddStation(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>Computer Cafe</h1>
          <p className="subtitle">Station Management System</p>

          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />

            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  if (showAddStation) {
    return (
      <div className="station-page">
        <header className="station-header">
          <div>
            <h1>Computer Cafe</h1>
            <p>Station Management System</p>
          </div>
        </header>

        <main className="station-content">
          <div className="form-card">
            <h2>Add Station</h2>
            <p className="form-description">
              Add a new computer station to the cafe.
            </p>

            <form onSubmit={handleAddStation}>
              <label htmlFor="stationName">
                Station Name / PC Number
              </label>

              <input
                id="stationName"
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="Example: PC-04"
              />

              <label htmlFor="tier">Tier / Category</label>

              <select
                id="tier"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
              >
                <option value="">Select a tier</option>
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>

              <label htmlFor="rate">Hourly Rate</label>

              <input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Example: 30"
                min="1"
              />

              {formError && (
                <p className="error-message">{formError}</p>
              )}

              <div className="form-buttons">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowAddStation(false);
                    setFormError("");
                  }}
                >
                  Cancel
                </button>

                <button type="submit">Save Station</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="station-page">
      <header className="station-header">
        <div>
          <h1>Computer Cafe</h1>
          <p>Station Management System</p>
        </div>

        <button
          className="logout-button"
          onClick={() => setIsLoggedIn(false)}
        >
          Logout
        </button>
      </header>

      <main className="station-content">
        <div className="station-title">
          <div>
            <h2>Station List</h2>
            <p>Manage your computer cafe stations</p>
          </div>

          <button
            className="add-button"
            onClick={() => setShowAddStation(true)}
          >
            +
          </button>
        </div>

        <div className="station-list">
          {stations.map((station) => (
            <div className="station-card" key={station.id}>
              <div>
                <h3>{station.name}</h3>
                <p>Tier: {station.tier}</p>
                <p>Hourly Rate: ₱{station.rate}</p>
              </div>

              <button className="details-button">
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;