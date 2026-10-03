import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [stations] = useState([
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

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "cafe_admin" && password === "pcshop2026") {
      setError("");
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password.");
    }
  };

  if (isLoggedIn) {
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

            <button className="add-button">+</button>
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

export default App;