import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showAddStation, setShowAddStation] = useState(false);
  const [editingStation, setEditingStation] = useState(null);

  const [stations, setStations] = useState([]);

  const [stationName, setStationName] = useState("");
  const [tier, setTier] = useState("");
  const [rate, setRate] = useState("");
  const [formError, setFormError] = useState("");

  // Get stations from Laravel API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stations")
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
      });
  }, []);

  // Login
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "cafe_admin" && password === "pcshop2026") {
      setError("");
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password.");
    }
  };

  // Add Station
   const handleDeleteStation = async (stationId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this station?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/stations/${stationId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete station.");
    }

    setStations((currentStations) =>
      currentStations.filter(
        (station) => station.id !== stationId
      )
    );
  } catch (error) {
    console.error(error);
    alert("Failed to delete station.");
  }
  };
  // Clear station form
  const clearForm = () => {
    setStationName("");
    setTier("");
    setRate("");
    setFormError("");
    setShowAddStation(false);
    setEditingStation(null);
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>Computer Cafe</h1>
          <p className="subtitle">
            Station Management System
          </p>

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

            {error && (
              <p className="error-message">{error}</p>
            )}

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // Add/Edit Station Form
  if (showAddStation || editingStation) {
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
            <h2>
              {editingStation
                ? "Edit Station"
                : "Add Station"}
            </h2>

            <p className="form-description">
              {editingStation
                ? "Update the computer station information."
                : "Add a new computer station to the cafe."}
            </p>

            <form
              onSubmit={
                editingStation
                  ? handleUpdateStation
                  : handleAddStation
              }
            >
              <label htmlFor="stationName">
                Station Name / PC Number
              </label>

              <input
                id="stationName"
                type="text"
                value={stationName}
                onChange={(e) =>
                  setStationName(e.target.value)
                }
                placeholder="Example: PC-04"
              />

              <label htmlFor="tier">
                Tier / Category
              </label>

              <select
                id="tier"
                value={tier}
                onChange={(e) =>
                  setTier(e.target.value)
                }
              >
                <option value="">
                  Select a tier
                </option>

                <option value="Regular">
                  Regular
                </option>

                <option value="Premium">
                  Premium
                </option>

                <option value="VIP">
                  VIP
                </option>
              </select>

              <label htmlFor="rate">
                Hourly Rate
              </label>

              <input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) =>
                  setRate(e.target.value)
                }
                placeholder="Example: 30"
                min="1"
              />

              {formError && (
                <p className="error-message">
                  {formError}
                </p>
              )}

              <div className="form-buttons">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={clearForm}
                >
                  Cancel
                </button>

                <button type="submit">
                  {editingStation
                    ? "Update Station"
                    : "Save Station"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // Station List Page
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
            <p>
              Manage your computer cafe stations
            </p>
          </div>

          <button
            className="add-button"
            onClick={() => {
              setEditingStation(null);
              setStationName("");
              setTier("");
              setRate("");
              setFormError("");
              setShowAddStation(true);
            }}
          >
            +
          </button>
        </div>

        <div className="station-list">
          {stations.length === 0 ? (
            <p>No stations found.</p>
          ) : (
            stations.map((station) => (
              <div
                className="station-card"
                key={station.id}
              >
                <div>
                  <h3>{station.name}</h3>

                  <p>
                    Tier: {station.tier}
                  </p>

                  <p>
                    Hourly Rate: ₱{station.rate}
                  </p>
                </div>

                <button
                  className="details-button"
                  onClick={() => {
                    setEditingStation(station);
                    setStationName(station.name);
                    setTier(station.tier);
                    setRate(station.rate);
                    setFormError("");
                  }}
                >
                  Edit
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
